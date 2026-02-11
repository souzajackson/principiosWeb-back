import { Op } from "sequelize";
import sequelize from "../config/database";

import { BadRequestError, Forbidden, NotFoundError } from "../middleware/HttpErrors";
import { AdoptionRepository } from "../repository/AdoptionRepository";
import { AnimalService } from "./AnimalService";
import { ShelterService } from "./ShelterService";
import { UserService } from "./UserService";

export class AdoptionService {
  private repo: AdoptionRepository
  private userService: UserService;
  private animalService: AnimalService;
  private shelterService: ShelterService;
  constructor(
    repo = new AdoptionRepository(), 
    userService = new UserService(), 
    animalService = new AnimalService(),
    shelterService = new ShelterService()) 
  {
    this.repo = repo;
    this.userService = userService;
    this.animalService = animalService;
    this.shelterService = shelterService;
  }

  async deleteAdoption(id: number) {
    await this.verifyID(id);
    return this.repo.deleteAdoption(id);
  }

  async getAdoptionById(id: number) {
    await this.verifyID(id);
    return this.repo.getAdoptionById(id);
  }

  async getAllAdoptions() {
    return this.repo.getAllAdoptions();
  }

  async createAdoption(data: any) {
    await this.verifyData(data);
    return this.repo.createAdoption({
      ...data,
      status: 'PENDING'
    });
  }

  async approveAdoption(adoptionId: number, userId: number) {
    await this.verifyAdoptionAndUser(adoptionId, userId);
    
    return sequelize.transaction(async (t) => {
      const adoption = await this.repo.updateAdoption(adoptionId, { status: 'APPROVED' }, t);
      if(!adoption) throw new NotFoundError("Não existe adoção com esse ID");
      await this.repo.rejectOtherPendingAdoptions(adoption.animalId, adoption.id, t);
      return adoption;
    }).catch((err: any) => {
      // Postgres unique violation
      if (err?.name === "SequelizeUniqueConstraintError" || err?.parent?.code === "23505") {
        throw new BadRequestError("Já existe uma adoção aprovada para este animal.");
      }
      throw err;
    });
  }
  
  async rejectAdoption(adoptionId: number, userId: number) {
    await this.verifyAdoptionAndUser(adoptionId, userId);
    return this.repo.updateAdoption(adoptionId, { status: 'REJECTED' });
  }
  
  private async verifyData(data: any) {
    if(!data.userId || !data.animalId) {
      throw new BadRequestError("É necessário informar o ID do usuário e animal");
    }
    
    await this.animalService.verifyID(data.animalId);
    await this.userService.verifyID(data.userId);
    
    // Verificar se já existe adoção APROVADA ou PENDENTE
    const adopted = await this.repo.getApprovedAdoptionByAnimalId(data.animalId);
    if(adopted) {
      throw new BadRequestError("O animal já foi adotado.");
    }
  }

  private async verifyID(id: number) {
    const adoption = await this.repo.getAdoptionById(id);
    if(!adoption) throw new NotFoundError("Não existe adoção com esse ID");
  }

  private async verifyAdoptionAndUser(adoptionId: number, userId: number) {
    const adoption = await this.repo.getAdoptionById(adoptionId);
    if(!adoption) throw new NotFoundError("Não existe adoção com esse ID");
    if(adoption.status != "PENDING") throw new BadRequestError("Não é possível aceitar ou rejeitar adoções que não estão pendentes.")
    const animal = await this.animalService.getAnimalById(adoption.animalId);
    if(!animal) throw new NotFoundError("Não existe animal na adoção");
    const shelter  = await this.shelterService.getShelterById(animal.shelterId);
    if(!shelter) throw new NotFoundError("Animal não tem abrigo associado");
    const user = await this.userService.getUserById(userId);
    if(!user) throw new NotFoundError("Não existe usuário com esse ID");

    if(userId != shelter.userId && user.role != 'SUPER') throw new Forbidden("Abrigo não é o responsável por essa adoção");
  }
}
