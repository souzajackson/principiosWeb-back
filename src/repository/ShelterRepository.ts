import { Shelter } from "../models/Shelter";

export class ShelterRepository {

  async createShelter(data: any) {
    return await Shelter.create(data);
  }

  async getAllShelters() {
    return await Shelter.findAll();
  }

  async getShelterById(id: number) {
    return await Shelter.findByPk(id);
  }

  async updateShelter(id: number, data: any) {
    return await Shelter.update(data, { where: { id } });
  }

  async deleteShelter(id: number) {
    return await Shelter.destroy({ where: { id } });
  }
}
