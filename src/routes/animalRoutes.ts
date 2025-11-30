import { Router } from "express";
import { AnimalRepository } from "../repository/AnimalRepository";

const router = Router();
const repo = new AnimalRepository();

router.post("/", async (req, res) => {
  res.status(201).json(await repo.createAnimal(req.body));
});

router.get("/", async (_, res) => {
  res.json(await repo.getAllAnimals());
});

router.get("/:id", async (req, res) => {
  res.json(await repo.getAnimalById(Number(req.params.id)));
});

router.put("/:id", async (req, res) => {
  await repo.updateAnimal(Number(req.params.id), req.body);
  res.json({ message: "Animal atualizado" });
});

router.delete("/:id", async (req, res) => {
  await repo.deleteAnimal(Number(req.params.id));
  res.json({ message: "Animal removido" });
});

export default router;
