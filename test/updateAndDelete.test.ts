import { expect } from "chai";
import request from "supertest";
import index from "../src/index";

describe("User Update and Delete", () => {
  let userId: number;
  let shelterId: number;
  let anotherUserId: number;

  // Função auxiliar para obter token
  async function getToken(email: string, password: string): Promise<string> {
    const res = await request(index)
      .post("/auth/login")
      .send({ email: email, password: password });
    return res.body.token;
  }

  // Criar usuários de teste antes dos testes
  before(async () => {
    // Criar USER 1
    const userRes = await request(index)
      .post("/users")
      .send({
        name: "userToUpdate",
        email: "userupdate@test.com",
        password: "123456",
        role: "USER"
      });
    userId = userRes.body.id;

    // Criar SHELTER
    const shelterRes = await request(index)
      .post("/users")
      .send({
        name: "shelterToDelete",
        email: "shelterdelete@test.com",
        password: "123456",
        role: "SHELTER"
      });
    shelterId = shelterRes.body.id;

    // Criar outro usuário
    const anotherUserRes = await request(index)
      .post("/users")
      .send({
        name: "anotherUser",
        email: "another@test.com",
        password: "123456",
        role: "USER"
      });
    anotherUserId = anotherUserRes.body.id;
  });

  /* TESTE 05 - Atualizar usuário */
  it("Deve atualizar dados do próprio usuário USER com token válido", async () => {
    const token = await getToken("userupdate@test.com", "123456");
    
    const res = await request(index)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "userUpdatedName"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Usuário atualizado");
  });

  /* TESTE 06 - Atualizar usuário SHELTER */
  it("Deve atualizar dados do próprio usuário SHELTER com token válido", async () => {
    const token = await getToken("shelterdelete@test.com", "123456");
    
    const res = await request(index)
      .put(`/users/${shelterId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "shelterUpdatedName"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Usuário atualizado");
  });

  /* TESTE 07 - Atualizar sem autenticação */
  it("Não deve atualizar usuário sem token de autenticação", async () => {
    const res = await request(index)
      .put(`/users/${userId}`)
      .send({
        name: "unauthorizedUpdate"
      });

    expect(res.status).to.equal(401);
  });

  /* TESTE 08 - Atualizar usuário de outro (sem ser SUPER) */
  it("Não deve permitir atualizar dados de outro usuário (erro 403 - Forbidden)", async () => {
    const token = await getToken("userupdate@test.com", "123456"); // Nome atualizado do teste 05
    
    const res = await request(index)
      .put(`/users/${anotherUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "hackAttempt"
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Sem permissão para atualizar esse usuário");
  });

  /* TESTE 09 - Atualizar com email já cadastrado */
  it("Não deve atualizar usuário com email já cadastrado (erro 400)", async () => {
    const token = await getToken("userupdate@test.com", "123456");
    
    const res = await request(index)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "another@test.com" // Email do anotherUser
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Email já está cadastrado");
  });

  /* TESTE 10 - Atualizar com email válido novo */
  it("Deve atualizar usuário com email novo e válido", async () => {
    const token = await getToken("userupdate@test.com", "123456");
    
    const res = await request(index)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "newemail@test.com"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Usuário atualizado");
  });

  /* TESTE 11 - Atualizar com ID inexistente */
  it("Não deve atualizar usuário com ID inexistente (erro 404)", async () => {
    const token = await getToken("newemail@test.com", "123456");
    
    const res = await request(index)
      .put(`/users/99999`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test"
      });

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("message", "Não existe usuário com esse ID");
  });

  /* TESTE 12 - Deletar usuário sem autenticação */
  it("Não deve deletar usuário sem token de autenticação", async () => {
    const res = await request(index)
      .delete(`/users/${userId}`);

    expect(res.status).to.equal(401);
  });

  /* TESTE 13 - Deletar usuário de outro (sem ser SUPER) */
  it("Não deve permitir deletar outro usuário (erro 403 - Forbidden)", async () => {
    const token = await getToken("newemail@test.com", "123456");
    
    const res = await request(index)
      .delete(`/users/${anotherUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Sem permissão para atualizar esse usuário");
  });

  /* TESTE 14 - Deletar usuário com ID inexistente */
  it("Não deve deletar usuário com ID inexistente (erro 404)", async () => {
    const token = await getToken("newemail@test.com", "123456");
    
    const res = await request(index)
      .delete(`/users/99999`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("message", "Não existe usuário com esse ID");
  });

  /* TESTE 15 - Deletar o próprio usuário USER */
  it("Deve deletar o próprio usuário USER com token válido", async () => {
    const token = await getToken("newemail@test.com", "123456");
    
    const res = await request(index)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Usuário removido");
  });

  /* TESTE 16 - Deletar o próprio usuário SHELTER */
  it("Deve deletar o próprio usuário SHELTER com token válido", async () => {
    const token = await getToken("shelterdelete@test.com", "123456");
    
    const res = await request(index)
      .delete(`/users/${shelterId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Usuário removido");
  });

  /* TESTE 17 - Deletar outro usuário */
  it("Deve deletar o outro usuário criado", async () => {
    const token = await getToken("another@test.com", "123456");
    
    const res = await request(index)
      .delete(`/users/${anotherUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Usuário removido");
  });
});