import { expect } from "chai";
import request from "supertest";
import index from "../src/index";

describe("Shelter Registration", () => {
  
  let userToken: string;
  let abrigoToken: string;

  // Setup: criar usuários para testes
  beforeEach(async () => {
    // Criar conta tipo USER
    await request(index)
      .post("/users")
      .send({
        name: "userComum",
        email: "user@comum.com",
        password: "123456",
        role: "USER"
      });

    // Fazer login e pegar token USER
    const userLogin = await request(index)
      .post("/auth/login")
      .send({
        name: "userComum",
        password: "123456"
      });
    userToken = userLogin.body.token;

    // Criar conta tipo ABRIGO
    await request(index)
      .post("/users")
      .send({
        name: "abrigoUser",
        email: "abrigo@test.com",
        password: "123456",
        role: "SHELTER" 
      });

    // Fazer login e pegar token ABRIGO
    const abrigoLogin = await request(index)
      .post("/auth/login")
      .send({
        name: "abrigoUser",
        password: "123456"
      });
    abrigoToken = abrigoLogin.body.token;
  });

  /* TESTE 07 */
  it("Deve criar abrigo com conta tipo ABRIGO e dados válidos", async () => {
    const res = await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${abrigoToken}`)
      .send({
        name: "Abrigo Esperança",
        address: "Rua das Flores, 123",
        phone: "(11) 98765-4321"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body).to.have.property("name", "Abrigo Esperança");
    expect(res.body).to.have.property("userId");
  });

  /* TESTE 08 */
  it("Deve retornar erro ao criar abrigo com nome já existente", async () => {
    // Criar primeiro abrigo
    await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${abrigoToken}`)
      .send({
        name: "Abrigo Duplicado",
        address: "Rua A, 100",
        phone: "(11) 11111-1111"
      });

    // Tentar criar com mesmo nome
    const res = await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${abrigoToken}`)
      .send({
        name: "Abrigo Duplicado",
        address: "Rua B, 200",
        phone: "(11) 22222-2222"
      });

    expect(res.status).to.equal(400);
  });

  /* TESTE 09 */
  it("Deve retornar erro ao criar abrigo com endereço já existente", async () => {
    // Criar primeiro abrigo
    await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${abrigoToken}`)
      .send({
        name: "Abrigo Original",
        address: "Rua Única, 999",
        phone: "(11) 33333-3333"
      });

    // Tentar criar com mesmo endereço
    const res = await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${abrigoToken}`)
      .send({
        name: "Outro Abrigo",
        address: "Rua Única, 999",
        phone: "(11) 44444-4444"
      });

    expect(res.status).to.equal(400);
  });

  /* TESTE 10 */
  it("Deve retornar erro quando conta tipo USER tenta criar abrigo", async () => {
    const res = await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Abrigo Proibido",
        address: "Rua Teste, 456",
        phone: "(11) 55555-5555"
      });

    expect(res.status).to.equal(403);
  });

  it("Deve retornar erro ao criar abrigo sem autenticação", async () => {
    const res = await request(index)
      .post("/shelters")
      .send({
        name: "Abrigo Sem Auth",
        address: "Rua Sem Token, 789",
        phone: "(11) 66666-6666"
      });

    expect(res.status).to.equal(401);
  });
});