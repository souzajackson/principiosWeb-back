// repository/AnimalRepository.ts
import { Op, WhereOptions } from "sequelize";
import { Animal } from "../models/Animal";

export type AnimalQuery = {
  page?: number;       
  pageSize?: number;   
  name?: string;        
  species?: string;   
  shelterId?: number;
  ageMin?: number;
  ageMax?: number;
  sortBy?: "id" | "name" | "species" | "age" | "shelterId";
  sortDir?: "ASC" | "DESC";
};

export class AnimalRepository {
  async searchAnimals(query: AnimalQuery) {
    const page = Math.max(1, Number(query.page ?? 1));
    const pageSize = Math.min(100, Math.max(1, Number(query.pageSize ?? 10)));
    const offset = (page - 1) * pageSize;

    const where: WhereOptions = {};

    if (query.shelterId != null) {
      where.shelterId = Number(query.shelterId);
    }

    if (query.name && query.name.trim() !== "") {
      // Postgres: ILIKE (case-insensitive)
      where.name = { [Op.iLike]: `%${query.name.trim()}%` };
      // Se não for Postgres, use Op.like
    }

    if (query.species && query.species.trim() !== "") {
      where.species = { [Op.iLike]: `%${query.species.trim()}%` };
    }

    if (query.ageMin != null || query.ageMax != null) {
      where.age = {};
      if (query.ageMin != null) (where.age as any)[Op.gte] = Number(query.ageMin);
      if (query.ageMax != null) (where.age as any)[Op.lte] = Number(query.ageMax);
    }

    const sortBy = query.sortBy ?? "id";
    const sortDir = query.sortDir ?? "ASC";

    const { rows, count } = await Animal.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [[sortBy, sortDir]],
    });

    return {
      items: rows,
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    };
  }

  // seus métodos antigos podem ficar também:
  async createAnimal(data: any) { return Animal.create(data); }
  async getAllAnimals() { return Animal.findAll(); }
  async getAnimalById(id: number) { return Animal.findByPk(id); }
  async updateAnimal(id: number, data: any) { return Animal.update(data, { where: { id } }); }
  async deleteAnimal(id: number) { return Animal.destroy({ where: { id } }); }
}
