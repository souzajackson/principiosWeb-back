import { Router } from "express";
import { UserRepository } from "../repository/UserRepository";

const router = Router();
const repo = new UserRepository();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await repo.createUser(name, email, password);
    return res.status(201).json(user);

  } catch (error: any) {
    return res.status(500).json({
      message: "Erro ao criar usuário",
      error: error.message
    });
  }
});

router.get("/", async (_, res) => {
  const users = await repo.getAllUsers();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await repo.getUserById(Number(req.params.id));
  res.json(user);
});

router.put("/:id", async (req, res) => {
  await repo.updateUser(Number(req.params.id), req.body);
  res.json({ message: "Usuário atualizado" });
});

router.delete("/:id", async (req, res) => {
  await repo.deleteUser(Number(req.params.id));
  res.json({ message: "Usuário removido" });
});

export default router;
