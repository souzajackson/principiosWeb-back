import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { User } from "../models/User";
import { ShelterRepository } from "../repository/ShelterRepository";
import { UserService } from "./UserService";

export class ShelterService {
  private repo: ShelterRepository;
  private userService: UserService;
  constructor(repo = new ShelterRepository(), userService = new UserService()) {
    this.repo = repo;
    this.userService = userService;
  }

  async deleteShelter(id: number, userId: number) {
    await this.verifyUpdate(id, userId);
    return this.repo.deleteShelter(id);
  }

  async updateShelter(id: number, data: any, userId: number) {
    delete data.userId;
    await this.verifyUpdate(id, userId);
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
    this.verifyData(data);
    
    // Validar nome duplicado
    await this.verifyUniqueName(data.name);
    
    // Validar endereço duplicado
    await this.verifyUniqueAddress(data.address);
    
    return this.repo.createShelter(data);
  }

  verifyData(data: any) {
    if (!data.phone || !data.address || !data.name) {
      throw new BadRequestError("Abrigo precisa ter nome, endereço e telefone");
    }
  }

  async verifyID(id: number) {
    const shelter = await this.repo.getShelterById(id);
    if (!shelter) {
      throw new NotFoundError("Não existe Abrigo com esse ID");
    }
  }

  async verifyUniqueName(name: string) {
    const existing = await this.repo.getShelterByName(name);
    if (existing) {
      throw new BadRequestError("Já existe um abrigo com este nome");
    }
  }

  async verifyUniqueAddress(address: string) {
    const existing = await this.repo.getShelterByAddress(address);
    if (existing) {
      throw new BadRequestError("Já existe um abrigo neste endereço");
    }
  }

  async verifyUpdate(id: number, userId: number) {
    const shelter = await this.repo.getShelterById(id);
    if (!shelter) {
      throw new NotFoundError("Não existe Abrigo com esse ID");
    }
    await this.userService.canUpdateShelter(shelter.userId, userId);
  }
}