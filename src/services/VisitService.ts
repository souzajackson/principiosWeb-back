import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { VisitRepository } from "../repository/VisitRepository";
import { ShelterService } from "./ShelterService";
import { UserService } from "./UserService";

export class VisitService {
  private repo: VisitRepository;
  private userService: UserService;
  private shelterService: ShelterService;
  constructor(
    repo = new VisitRepository(),
    userService = new UserService(),
    shelterService = new ShelterService()  
  )
  {
    this.repo = repo;
    this.userService = userService;
    this.shelterService = shelterService;
  }

  async deleteVisit(id: number) {
    await this.verifyID(id);
    return this.repo.deleteVisit(id);
  }
  async getVisitById(id: number) {
    await this.verifyID(id);
    return this.repo.getVisitById(id);
  }
  async getAllVisits() {
    return this.repo.getAllVisits();
  }
  async createVisit(data: any) {
    await this.verifyData(data);
    return this.repo.createVisit(data)
  }

  async verifyID(id: number) {
    const visit = await this.repo.getVisitById(id);
    if(!visit) throw new NotFoundError("Não existe visita com esse ID");
  }

  async verifyData(data: any) {
    if(!data.userId || !data.shelterId || !data.date) {
      throw new BadRequestError("Id do Usuário, Id do abrigo e data são obrigatórios.")
    }
    await this.shelterService.verifyID(data.shelterId);
    await this.userService.verifyID(data.userId);
  }
}
