import { expect } from "chai";
import request from "supertest";
import index from "../src/index";

describe("Animal Registration", () => {
  
  let userToken: string;
  let shelterToken: string;
  let shelterWithoutShelterToken: string;
  let shelterId: number;

  beforeEach(async () => {
    // Criar usuário comum (USER)
    await request(index)
      .post("/users")
      .send({
        name: "userAnimal",
        email: "userAnimal@comum.com",
        password: "123456",
        role: "USER"
      });

    const userLogin = await request(index)
      .post("/auth/login")
      .send({
        email: "userAnimal@comum.com",
        password: "123456"
      });
    userToken = userLogin.body.token;

    // Criar usuário SHELTER que vai ter abrigo
    await request(index)
      .post("/users")
      .send({
        name: "shelterWithShelter",
        email: "shelter1@test.com",
        password: "123456",
        role: "SHELTER"
      });

    const shelterLogin = await request(index)
      .post("/auth/login")
      .send({
        email: "shelter1@test.com",
        password: "123456"
      });
    shelterToken = shelterLogin.body.token;

    // Criar abrigo associado ao usuário SHELTER
    const shelterResponse = await request(index)
      .post("/shelters")
      .set("Authorization", `Bearer ${shelterToken}`)
      .send({
        name: "Abrigo dos Pets",
        address: "Rua dos Animais, 100",
        phone: "(11) 99999-9999"
      });
    shelterId = shelterResponse.body.id;

    // Criar usuário SHELTER SEM abrigo
    await request(index)
      .post("/users")
      .send({
        name: "shelterWithoutShelter",
        email: "shelter2@test.com",
        password: "123456",
        role: "SHELTER"
      });

    const shelterLogin2 = await request(index)
      .post("/auth/login")
      .send({
        email: "shelter2@test.com",
        password: "123456"
      });
    shelterWithoutShelterToken = shelterLogin2.body.token;
  });

  /* TESTE 11 */
  it("Deve criar animal com conta SHELTER que tem abrigo associado", async () => {
    const res = await request(index)
      .post("/animals")
      .set("Authorization", `Bearer ${shelterToken}`)
      .send({
        name: "Rex",
        species: "DOG",
        age: 3,
        description: "Cachorro manso",
        sex: "MALE",
        breed: "poodle",
        photoUrl: "",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body).to.have.property("name", "Rex");
    expect(res.body).to.have.property("shelterId", shelterId);
  });

  /* TESTE 12 */
  it("Deve retornar erro quando conta SHELTER sem abrigo tenta criar animal", async () => {
    const res = await request(index)
      .post("/animals")
      .set("Authorization", `Bearer ${shelterWithoutShelterToken}`)
      .send({
        name: "Rex",
        species: "DOG",
        age: 3,
        description: "Cachorro manso",
        sex: "MALE",
        breed: "poodle",
        photoUrl: "",
      });

    expect(res.status).to.equal(404);
  });

  /* TESTE 13 */
  it("Deve retornar erro quando conta USER tenta criar animal", async () => {
    const res = await request(index)
      .post("/animals")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Rex",
        species: "DOG",
        age: 3,
        description: "Cachorro manso",
        sex: "MALE",
        breed: "poodle",
        photoUrl: "",
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Forbidden");
  });
});