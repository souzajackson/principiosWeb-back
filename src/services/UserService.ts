import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  private repo: UserRepository;

  constructor(repo = new UserRepository()) {
    this.repo = repo;
  }

  async deleteUser(id: number) {
    await this.verifyID(id);
    return this.repo.deleteUser(id);
  }

  async updateUser(id: number, data: any) {
    await this.verifyID(id);
    if(data.email != null) await this.verifyEmail(data.email, id)

    return this.repo.updateUser(id, data)
  }

  async getUserById(id: number) {
    await this.verifyID(id);
    return this.repo.getUserById(id);
  }

  async getUserByName(name: string) {
    const user = await this.repo.getUserByName(name);
    if(!user) throw new NotFoundError("Não existe usuário com esse nome");
    return user;
  }

  async getAllUsers() {
    return this.repo.getAllUsers();
  }

  async createUser(data: any) {
    await this.verifyData(data);
    return this.repo.createUser(data);
  }

  async verifyID(id: number) {
    const user = await this.repo.getUserById(id);
    if(!user) throw new NotFoundError("Não existe usuário com esse ID");
  }

  async verifyData(data: any) {
    if(!data.name || !data.email || !data.password || !data.role) {
      throw new BadRequestError("Nome, Email, Senha e Role são obrigatórios!")
    }

    if(!['USER','SHELTER'].includes(data.role)) {
      throw new BadRequestError("Role inválido")
    }

    await this.verifyEmail(data.email)
  }

  
  async verifyEmail(email: string, userId = -1) {
    const user = await this.repo.getUserByEmail(email)
    if(user != null && user.id != userId) {
      throw new BadRequestError("Email já está cadastrado")     
    }
  }
}
