import { VisitRepository } from "../repository/VisitRepository";

export class VisitService {
  private repo: VisitRepository;

  constructor(repo = new VisitRepository()) {
    this.repo = repo;
  }

  async deleteVisit(id: number) {
    return this.repo.deleteVisit(id);
  }
  async getVisitById(id: number) {
    return this.repo.getVisitById(id);
  }
  async getAllVisits() {
    return this.repo.getAllVisits();
  }
  async createVisit(data: any) {
    return this.repo.createVisit(data)
  }
}
