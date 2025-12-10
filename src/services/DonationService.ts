import { DonationRepository } from "../repository/DonationRepository";

export class DonationService {
  private repo: DonationRepository;

  constructor(repo = new DonationRepository()) {
    this.repo = repo;
  }

  async deleteDonation(id: number) {
    return this.repo.deleteDonation(id);
  }
  async getDonationById(id: number) {
    return this.repo.getDonationById(id);
  }
  async getAllDonations() {
    return this.repo.getAllDonations();
  }
  async createDonation(data: any) {
    return this.repo.createDonation(data);
  }
}
