import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { AdoptionRepository } from "../repository/AdoptionRepository";
import { AnimalService } from "./AnimalService";
import { UserService } from "./UserService";

export class AdoptionService {
  private repo: AdoptionRepository
  private userService: UserService;
  private animalService: AnimalService;
  constructor(
    repo = new AdoptionRepository(), 
    userService = new UserService(), 
    animalService = new AnimalService()) 
  {
    this.repo = repo;
    this.userService = userService;
    this.animalService = animalService;
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

  private async verifyData(data: any) {
    if(!data.userId || !data.animalId) {
      throw new BadRequestError("É necessário informar o ID do usuário e animal")
    }

    await this.animalService.verifyID(data.animalId);
    await this.userService.verifyID(data.userId);

    if(await this.repo.getAdoptionByAnimalId(data.animalId) != null) {
      throw new BadRequestError("O animal já foi adotado.")
    }
  }

  private async verifyID(id: number) {
    const adoption = await this.repo.getAdoptionById(id);
    if(!adoption) throw new NotFoundError("Não existe adoção com esse ID");
  }

  async approveAdoption(id: number) {
    await this.verifyID(id);
    return this.repo.updateAdoption(id, { status: 'APPROVED' });
  }

  async rejectAdoption(id: number) {
    await this.verifyID(id);
    await this.repo.deleteAdoption(id);

    return { message: "Adoption rejected and removed" };
  }


}
