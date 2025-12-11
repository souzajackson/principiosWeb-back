import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { ShelterRepository } from "../repository/ShelterRepository";

export class ShelterService {
  private repo: ShelterRepository;
  constructor(repo = new ShelterRepository()) {
    this.repo = repo;
  }

  async deleteShelter(id: number) {
    await this.verifyID(id);
    return this.repo.deleteShelter(id);
  }
  async updateShelter(id: number, data: any) {
    await this.verifyID(id);
    return this.repo.updateShelter(id, data);
  }
  async getShelterById(id: number) {
    await this.verifyID(id);
    return this.repo.getShelterById(id);
  }
  async getAllShelters() {
    return this.repo.getAllShelters();
  }
  async createShelter(data: any) {
    this.verifyData(data)
    return this.repo.createShelter(data);
  }

  verifyData(data: any) {
    if(!data.phone || !data.address || !data.name) {
      throw new BadRequestError("Abrigo precisa ter nome, endereço e telefone")
    }
  }

  async verifyID(id: number) {
    const shelter = await this.repo.getShelterById(id);
    if(!shelter) throw new NotFoundError("Não existe Abrigo com esse ID");
  }
}

