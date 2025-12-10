import { ShelterRepository } from "../repository/ShelterRepository";

export class ShelterService {

  private repo: ShelterRepository;

  constructor(repo = new ShelterRepository()) {
    this.repo = repo;
  }

  async deleteShelter(id: number) {
    return this.repo.deleteShelter(id);
  }
  async updateShelter(id: number, data: any) {
    return this.repo.updateShelter(id, data);
  }
  async getShelterById(id: number) {
    return this.repo.getShelterById(id);
  }
  async getAllShelters() {
    return this.repo.getAllShelters();
  }
  async createShelter(data: any) {
    return this.repo.createShelter(data);
  }
}
