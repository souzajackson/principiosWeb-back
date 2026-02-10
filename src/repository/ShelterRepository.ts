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

  async getShelterByName(name: string) {
    return await Shelter.findOne({ where: { name } });
  }

  async getShelterByAddress(address: string) {
    return await Shelter.findOne({ where: { address } });
  }

  async updateShelter(id: number, data: any) {
    const shelter = await Shelter.findByPk(id);
    if (shelter) {
      return await shelter.update(data);
    }
    return null;
  }

  async deleteShelter(id: number) {
    const shelter = await Shelter.findByPk(id);
    if (shelter) {
      return await shelter.destroy();
    }
    return null;
  }
}