import { AnimalRepository } from "../repository/AnimalRepository";

export class AnimalService {
  private repo: AnimalRepository;

  constructor(repo = new AnimalRepository()) {
    this.repo = repo;
  }

  async deleteAnimal(id: number) {
    return this.repo.deleteAnimal(id);
  }
  async updateAnimal(id: number, data: any) {
    return this.repo.updateAnimal(id, data);
  }
  async getAnimalById(id: number) {
    return this.repo.getAnimalById(id);
  }
  async getAllAnimals() {
    return this.repo.getAllAnimals();
  }
  async createAnimal(data: any) {
    return this.repo.createAnimal(data);
  }
}
