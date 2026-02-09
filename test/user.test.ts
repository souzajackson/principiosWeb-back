import { expect } from "chai";
import request from "supertest";
import index from "../src/index";

describe("User Registration", () => {

  /* TESTE 01 */
  it("Deve criar conta USER com dados válidos", async () => {
    const res = await request(index)
      .post("/users")
      .send({
        name: "userTest",
        email: "user@test.com",
        password: "123456",
        role:  "USER"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  /* TESTE 02 */
  it("Deve criar conta ABRIGO com dados válidos", async () => {
    const res = await request(index)
      .post("/users")
      .send({
        name: "abrigoTest",
        email: "abrigo@testUser.com",
        password: "123456",
        role: "SHELTER"
      });

    expect(res.status).to.equal(201);
  });

  /* TESTE 03 */
  it("Não deve criar conta USER com dados inválidos", async () => {
    const res = await request(index)
      .post("/users")
      .send({
        email: "emailinvalido",
        password: "",
        role: "USER"
      });

    expect(res.status).to.not.equal(201);
  });

  /* TESTE 04 */
  it("Não deve criar conta ABRIGO com dados inválidos", async () => {
    const res = await request(index)
      .post("/users")
      .send({
        email: "",
        password: "",
        role: "SHELTER"
      });

    expect(res.status).to.not.equal(201);
  });

});
