import { User } from "../models/User";

export class UserRepository {
  async createUser(data: any) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } })
  }

  async updateUser(id: number, data: any) {
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }
}
