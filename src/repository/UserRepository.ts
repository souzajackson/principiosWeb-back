import { User } from "../models/User";
import { hashPassword } from "../utils/auth";

export class UserRepository {
  async createUser(data: any) {
    const hashedPassword = await hashPassword(data.password);
    return await User.create({
      ...data,
      password: hashedPassword
    });
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getUserByName(name: string) {
    return await User.findOne({where: { name }})
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } })
  }

  async updateUser(id: number, data: any) {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }
}
