import { User } from "../model/User";

export class UserRepository {

  async createUser(name: string, email: string, password: string) {
    return await User.create({ name, email, password });
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async updateUser(id: number, data: any) {
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }
}
