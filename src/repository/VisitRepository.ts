import { Visit } from "../model/Visit";

export class VisitRepository {

  async createVisit(data: any) {
    return await Visit.create(data);
  }

  async getAllVisits() {
    return await Visit.findAll();
  }

  async getVisitById(id: number) {
    return await Visit.findByPk(id);
  }

  async deleteVisit(id: number) {
    return await Visit.destroy({ where: { id } });
  }
}
