import { expect } from "chai";
import request from "supertest";
import index from "../src/index";

describe("User Login", () => {
  
  // Setup: criar um usuário para testar login
  beforeEach(async () => {
    await request(index)
      .post("/users")
      .send({
        name: "loginTest",
        email: "login@test.com",
        password: "123456",
        role: "USER"
      });
  });

  /* TESTE 05 */
  it("Deve fazer login com email e senha válidos", async () => {
    const res = await request(index)
      .post("/auth/login")
      .send({
        email: "login@test.com",  // ou email, dependendo da sua implementação
        password: "123456"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("message", "Login successful");
  });

  /* TESTE 06 */
  it("Deve retornar erro com email ou senha inválidos", async () => {
    const res = await request(index)
      .post("/auth/login")
      .send({
        email: "login@test.com",
        password: "senhaErrada"
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Invalid username or password");
  });

  it("Deve retornar erro com usuário inexistente", async () => {
    const res = await request(index)
      .post("/auth/login")
      .send({
        email: "usuarioInexistente",
        password: "123456"
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Invalid username or password");
  });
});