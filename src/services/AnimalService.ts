import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BadRequestError, Forbidden, NotFoundError } from "../middleware/HttpErrors";
import { AnimalRepository } from "../repository/AnimalRepository";
import { ShelterService } from "./ShelterService";

export class AnimalService {
  private repo: AnimalRepository;
  private shelterService: ShelterService;
  constructor(repo = new AnimalRepository(), shelterService = new ShelterService()) {
    this.repo = repo;
    this.shelterService = shelterService;
  }

  async deleteAnimal(id: number, userId: number) {
    await this.verifyID(id);
    await this.verifyUser(id, userId);
    return this.repo.deleteAnimal(id);
  }

  async updateAnimal(id: number, data: any, userId: number) {
    await this.verifyID(id);
    await this.verifyUser(id, userId);
    data.shelterID = null;
    return this.repo.updateAnimal(id, data);
  }

  async getAnimalById(id: number) {
    await this.verifyID(id);
    return this.repo.getAnimalById(id);
  }

  async getAllAnimals() {
    return this.repo.getAllAnimals();
  }

  async searchAnimals(req: any) {
    const result = await this.repo.searchAnimals({
        page: req.query.page ? Number(req.query.page) : undefined,
        pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
        name: req.query.name as string | undefined,
        species: req.query.species as string | undefined,
        shelterId: req.query.shelterId ? Number(req.query.shelterId) : undefined,
        ageMin: req.query.ageMin ? Number(req.query.ageMin) : undefined,
        ageMax: req.query.ageMax ? Number(req.query.ageMax) : undefined,
        sortBy: req.query.sortBy as any,
        sortDir: req.query.sortDir as any,
      });

    return result;
  }

  async createAnimal(data: any) {
    await this.verifyData(data);
    return this.repo.createAnimal(data);
  }

  async verifyID(id: number) {
    const animal = await this.repo.getAnimalById(id);
    if(!animal) throw new NotFoundError("Não existe Animal com esse ID");
  }

  async verifyUser(id: number, userId: number) {
    const animal = await this.repo.getAnimalById(id);
    if(!animal) throw new NotFoundError("Não existe Animal com esse ID");
    const shelter = await this.shelterService.getShelterById(animal.shelterId);
    if(!shelter) throw new NotFoundError("Animal sem abrigo");
    if(shelter.userId != userId) throw new Forbidden("Não é possível atualizar animais de outros abrigos")
  }

  async verifyData(data: any) {
    if(!data.name || !data.species || !data.age || !data.shelterId) {
      throw new BadRequestError("Nome, espécie, idade e ID do abrigo são obrigatórios")      
    }
    await this.shelterService.verifyID(data.shelterId);
  }
}
