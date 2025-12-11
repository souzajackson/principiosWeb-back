import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { DonationRepository } from "../repository/DonationRepository";
import { ShelterService } from "./ShelterService";
import { UserService } from "./UserService";

export class DonationService {
  private repo: DonationRepository;
  private userService: UserService;
  private shelterService: ShelterService;

  constructor(
    repo = new DonationRepository(),
    userService = new UserService(),
    shelterService = new ShelterService()
  ) 
  {
    this.repo = repo;
    this.userService = userService;
    this.shelterService = shelterService;
  }

  async deleteDonation(id: number) {
    await this.verifyID(id);
    return this.repo.deleteDonation(id);
  }

  async getDonationById(id: number) {
    await this.verifyID(id);
    return this.repo.getDonationById(id);
  }

  async getAllDonations() {
    return this.repo.getAllDonations();
  }

  async createDonation(data: any) {
    await this.verifyData(data);
    return this.repo.createDonation(data);
  }

  async verifyID(id: number) {
    const donation = await this.repo.getDonationById(id);
    if(!donation) throw new NotFoundError("Não existe doação com esse ID");
  }

  async verifyData(data: any) {
    if(!data.userId || !data.shelterId || !data.amount) {
      throw new BadRequestError("Id do Usuário, Id do abrigo e valor da doação são obrigatórios.")
    }
    await this.shelterService.verifyID(data.shelterId);
    await this.userService.verifyID(data.userId);
  }
}
