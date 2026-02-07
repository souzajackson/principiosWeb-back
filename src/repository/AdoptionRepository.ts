import { Adoption } from "../models/Adoption";

export class AdoptionRepository {

  async createAdoption(data: any) {
    return await Adoption.create(data);
  }

  async getAllAdoptions() {
    return await Adoption.findAll();
  }

  async getAdoptionById(id: number) {
    return await Adoption.findByPk(id);
  }

  async getAdoptionByAnimalId(animalId: number) {
    return await Adoption.findOne({ where: { animalId } });
  }

  async updateAdoption(id: number, data: any) {
    await Adoption.update(data, { where: { id } });
    return this.getAdoptionById(id);
  }

  async deleteAdoption(id: number) {
    return await Adoption.destroy({ where: { id } });
  }
}
