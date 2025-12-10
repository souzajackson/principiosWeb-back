import { Router } from "express";
import { UserService } from "../services/UserService";

const router = Router();

const service = new UserService();

router.post("/", async (req, res) => {
  const user = await service.createUser(req.body);
  res.status(201).json(user);
});

router.get("/", async (_, res) => {
  const users = await service.getAllUsers();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await service.getUserById(Number(req.params.id));
  res.json(user);
});

router.put("/:id", async (req, res) => {
  await service.updateUser(Number(req.params.id), req.body);
  res.json({ message: "Usuário atualizado" });
});

router.delete("/:id", async (req, res) => {
  await service.deleteUser(Number(req.params.id));
  res.json({ message: "Usuário removido" });
});

export default router;
