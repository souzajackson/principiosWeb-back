import { Shelter } from "../models/Shelter";
import { Visit } from "../models/Visit";

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

  async getVisitsByUserId(id: number) {
    return Visit.findAll({
      where: { userId: id },
      include: [
        {
          association: 'shelter',
          attributes: ['id', 'name', 'address', 'phone'],
        },
      ],
      order: [['date', 'ASC']],
    });
  }
}
