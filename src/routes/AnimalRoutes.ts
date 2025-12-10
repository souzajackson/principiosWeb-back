import { Router } from "express";
import { AnimalService } from "../services/AnimalService";

const router = Router();
const service = new AnimalService();

router.post("/", async (req, res) => {
  res.status(201).json(await service.createAnimal(req.body));
});

router.get("/", async (_, res) => {
  res.json(await service.getAllAnimals());
});

router.get("/:id", async (req, res) => {
  res.json(await service.getAnimalById(Number(req.params.id)));
});

router.put("/:id", async (req, res) => {
  await service.updateAnimal(Number(req.params.id), req.body);
  res.json({ message: "Animal atualizado" });
});

router.delete("/:id", async (req, res) => {
  await service.deleteAnimal(Number(req.params.id));
  res.json({ message: "Animal removido" });
});

export default router;
