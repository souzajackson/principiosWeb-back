import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { AnimalRepository } from "../repository/AnimalRepository";
import { ShelterService } from "./ShelterService";

export class AnimalService {
  private repo: AnimalRepository;
  private shelterService: ShelterService;
  constructor(repo = new AnimalRepository(), shelterService = new ShelterService()) {
    this.repo = repo;
    this.shelterService = shelterService;
  }

  async deleteAnimal(id: number) {
    await this.verifyID(id);
    return this.repo.deleteAnimal(id);
  }

  async updateAnimal(id: number, data: any) {
    await this.verifyID(id);
    const shelterID = data.shelterId;
    if(shelterID != null) await this.shelterService.verifyID(shelterID);
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

  async verifyData(data: any) {
    if(!data.name || !data.species || !data.age || !data.shelterId) {
      throw new BadRequestError("Nome, espécie, idade e ID do abrigo são obrigatórios")      
    }
    await this.shelterService.verifyID(data.shelterId);
  }
}
