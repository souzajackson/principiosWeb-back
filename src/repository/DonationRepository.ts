import { Donation } from "../models/Donation";

export class DonationRepository {

  async createDonation(data: any) {
    return await Donation.create(data);
  }

  async getAllDonations() {
    return await Donation.findAll();
  }

  async getDonationById(id: number) {
    return await Donation.findByPk(id);
  }

  async deleteDonation(id: number) {
    return await Donation.destroy({ where: { id } });
  }
}
