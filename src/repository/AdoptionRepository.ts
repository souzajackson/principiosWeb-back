import { Adoption } from "../models/Adoption";
import { Transaction } from "sequelize";
import { Op } from "sequelize";

export class AdoptionRepository {

  async createAdoption(data: any) {
    return Adoption.create(data);
  }

  async getAllAdoptions() {
    return Adoption.findAll();
  }

  async getAdoptionById(id: number, t?: Transaction) {
    return Adoption.findByPk(id, { transaction: t });
  }

  async getAdoptionByAnimalId(animalId: number) {
    return Adoption.findOne({ where: { animalId } });
  }

  async getApprovedAdoptionByAnimalId(animalId: number) {
    return Adoption.findOne({
      where: { animalId, status: "APPROVED" },
    });
  }

  async updateAdoption(id: number, data: any, t?: Transaction) {
    await Adoption.update(data, { where: { id }, transaction: t });
    return this.getAdoptionById(id, t);
  }

  async deleteAdoption(id: number) {
    return Adoption.destroy({ where: { id }});
  }

  async rejectOtherPendingAdoptions(animalId: number, approvedId: number, t?: Transaction) {
    return Adoption.update(
      { status: "REJECTED" },
      {
        where: {
          animalId,
          id: { [Op.ne]: approvedId },
          status: "PENDING",
        },
        transaction: t,
      }
    );
  }
}
