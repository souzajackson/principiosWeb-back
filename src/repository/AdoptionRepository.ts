import { Adoption } from "../models/Adoption";
import { Animal } from "../models/Animal";
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

  // Adoções de todos os animais de um abrigo (visão do abrigo)
  async getAdoptionsByShelterId(shelterId: number) {
    return Adoption.findAll({
      include: [
        {
          model: Animal,
          as: "animal",
          where: { shelterId },
          required: true,
        },
      ],
    });
  }

  // Adoções feitas por um usuário específico (visão do usuário)
  async getAdoptionsByUserId(userId: number) {
    return Adoption.findAll({
      where: { userId },
    });
  }

  async updateAdoption(id: number, data: any, t?: Transaction) {
    await Adoption.update(data, { where: { id }, transaction: t });
    return this.getAdoptionById(id, t);
  }

  async deleteAdoption(id: number) {
    return Adoption.destroy({ where: { id } });
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