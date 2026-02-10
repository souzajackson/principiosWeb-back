import { BadRequestError, Forbidden, NotFoundError } from "../middleware/HttpErrors";
import { AnimalRepository } from "../repository/AnimalRepository";
import { ShelterService } from "./ShelterService";

export class AnimalService {
  private repo: AnimalRepository;
  private shelterService: ShelterService;
  constructor(repo = new AnimalRepository(), shelterService = new ShelterService()) {
    this.repo = repo;
    this.shelterService = shelterService;
  }

  async deleteAnimal(id: number, userId: number) {
    await this.verifyID(id);
    await this.verifyUser(id, userId);
    return this.repo.deleteAnimal(id);
  }

  async updateAnimal(id: number, data: any, userId: number) {
    await this.verifyID(id);
    await this.verifyUser(id, userId);
    data.shelterID = null;
    return this.repo.updateAnimal(id, data);
  }

  async getAnimalById(id: number) {
    await this.verifyID(id);
    return this.repo.getAnimalById(id);
  }

  async getAllAnimals() {
    return this.repo.getAllAnimals();
  }

  async createAnimal(data: any) {
    await this.verifyData(data);
    return this.repo.createAnimal(data);
  }

  async verifyID(id: number) {
    const animal = await this.repo.getAnimalById(id);
    if(!animal) throw new NotFoundError("Não existe Animal com esse ID");
  }

  async verifyUser(id: number, userId: number) {
    const animal = await this.repo.getAnimalById(id);
    if(!animal) throw new NotFoundError("Não existe Animal com esse ID");
    const shelter = await this.shelterService.getShelterById(animal.shelterId);
    if(!shelter) throw new NotFoundError("Animal sem abrigo");
    if(shelter.userId != userId) throw new Forbidden("Não é possível atualizar animais de outros abrigos")
  }

  async verifyData(data: any) {
    if(!data.name || !data.species || !data.age || !data.shelterId) {
      throw new BadRequestError("Nome, espécie, idade e ID do abrigo são obrigatórios")      
    }
    await this.shelterService.verifyID(data.shelterId);
  }
}
