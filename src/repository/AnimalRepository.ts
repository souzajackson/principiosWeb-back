import { Animal } from "../models/Animal";

export class AnimalRepository {

  async createAnimal(data: any) {
    return await Animal.create(data);
  }

  async getAllAnimals() {
    return await Animal.findAll();
  }

  async getAnimalById(id: number) {
    return await Animal.findByPk(id);
  }

  async updateAnimal(id: number, data: any) {
    return await Animal.update(data, { where: { id } });
  }

  async deleteAnimal(id: number) {
    return await Animal.destroy({ where: { id } });
  }
}
