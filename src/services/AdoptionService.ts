import { AdoptionRepository } from "../repository/AdoptionRepository";

export class AdoptionService {
  private repo: AdoptionRepository

  constructor(repo = new AdoptionRepository()) {
    this.repo = repo;
  }

  async deleteAdoption(id: number) {
    return this.repo.deleteAdoption(id);
  }
  async getAdoptionById(id: number) {
    return this.repo.getAdoptionById(id);
  }
  async getAllAdoptions() {
    return this.repo.getAllAdoptions();
  }
  async createAdoption(data: any) {
    return this.repo.createAdoption(data);
  }
}
