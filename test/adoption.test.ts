import { expect } from "chai";
import request from "supertest";
import index from "../src/index";

describe("Animal Adoption", () => {
  
  let userToken: string;
  let shelterToken: string;
  let animalId: number;
  let adoptionId: number;

  beforeEach(async () => {
    // Criar usuário USER
    await request(index)
      .post("/users")
      .send({
        name: "adotante",
        email: "adotante@test.com",
        password: "123456",
        role: "USER"
      });

    const userLogin = await request(index)
      .post("/auth/login")
      .send({
        email: "adotante@test.com",
        password: "123456"
      });
    userToken = userLogin.body.token;

    // Criar usuário SHELTER
    await request(index)
      .post("/users")
      .send({
        name: "abrigoAdocao",
        email: "abrigo@adocao.com",
        password: "123456",
        role: "SHELTER"
      });

    const shelterLogin = await request(index)
      .post("/auth/login")
      .send({
        email: "abrigo@adocao.com",
        password: "123456"
      });
    shelterToken = shelterLogin.body.token;

    // Criar abrigo
    await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${shelterToken}`)
      .send({
        name: "Abrigo Feliz",
        address: "Av. Adoção, 500",
        phone: "(11) 88888-8888"
      });

    // Criar animal
    const animalRes = await request(index)
      .post("/animals")
      .set("Authorization", `Bearer ${shelterToken}`)
      .send({
        name: "Totó",
        species: "Cachorro",
        age: 2
      });
    animalId = animalRes.body.id;
  });

  /* TESTE 14 */
  it("Deve criar solicitação de adoção com conta USER", async () => {
    const res = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: animalId
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body).to.have.property("animalId", animalId);
    expect(res.body).to.have.property("status", "PENDING");
    
    adoptionId = res.body.id;
  });

  /* TESTE 15 */
  it("Deve retornar erro quando conta SHELTER tenta criar solicitação de adoção", async () => {
    const res = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${shelterToken}`)
      .send({
        animalId: animalId
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Forbidden");
  });

  /* TESTE 16 */
  it("Deve retornar erro ao tentar adotar animal com ID inexistente", async () => {
    const res = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: 99999
      });

    expect(res.status).to.equal(404);
  });

  /* TESTE 17 */
  it("Deve confirmar adoção e impedir novas solicitações para o animal", async () => {
    // Criar primeira adoção
    const adoption1 = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: animalId
      });

    adoptionId = adoption1.body.id;

    // Confirmar adoção
    const approveRes = await request(index)
      .patch(`/adoptions/${adoptionId}/approve`)
      .set("Authorization", `Bearer ${shelterToken}`);

    expect(approveRes.status).to.equal(200);
    expect(approveRes.body).to.have.property("status", "APPROVED");

    // Tentar criar nova adoção para o mesmo animal
    const adoption2 = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: animalId
      });

    expect(adoption2.status).to.equal(400);
  });

  /* TESTE 18 */
  it("Deve recusar adoção", async () => {
    // Criar adoção
    const adoptionRes = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: animalId
      });

    adoptionId = adoptionRes.body.id;

    // Recusar adoção
    const rejectRes = await request(index)
      .patch(`/adoptions/${adoptionId}/reject`)
      .set("Authorization", `Bearer ${shelterToken}`);

    expect(rejectRes.status).to.equal(200);
    expect(rejectRes.body).to.have.property("status", "REJECTED");
  });

  it("Deve permitir nova solicitação após rejeição", async () => {
    // Criar e rejeitar primeira adoção
    const adoption1 = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: animalId
      });

    await request(index)
      .patch(`/adoptions/${adoption1.body.id}/reject`)
      .set("Authorization", `Bearer ${shelterToken}`);

    // Criar nova solicitação (deve funcionar)
    const adoption2 = await request(index)
      .post("/adoptions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        animalId: animalId
      });

    expect(adoption2.status).to.equal(201);
    expect(adoption2.body).to.have.property("status", "PENDING");
  });
});