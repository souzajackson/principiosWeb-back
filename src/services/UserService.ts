import { UserRepository } from "../repository/UserRepository";

export class UserService {
  private repo: UserRepository;

  constructor(repo = new UserRepository()) {
    this.repo = repo;
  }

  async deleteUser(id: number) {
    return this.repo.deleteUser(id);
  }
  async updateUser(id: number, data: any) {
    return this.repo.updateUser(id, data)
  }
  async getUserById(id: number) {
    return this.repo.getUserById(id);
  }
  async getAllUsers() {
    return this.repo.getAllUsers();
  }
  async createUser(data: any) {
    return this.repo.createUser(data);
  }
}
