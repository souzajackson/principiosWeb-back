import { Router } from "express";
import { ShelterRepository } from "../repository/ShelterRepository";

const router = Router();
const repo = new ShelterRepository();

router.post("/", async (req, res) => {
  const shelter = await repo.createShelter(req.body);
  res.status(201).json(shelter);
});

router.get("/", async (_, res) => {
  res.json(await repo.getAllShelters());
});

router.get("/:id", async (req, res) => {
  res.json(await repo.getShelterById(Number(req.params.id)));
});

router.put("/:id", async (req, res) => {
  await repo.updateShelter(Number(req.params.id), req.body);
  res.json({ message: "Abrigo atualizado" });
});

router.delete("/:id", async (req, res) => {
  await repo.deleteShelter(Number(req.params.id));
  res.json({ message: "Abrigo removido" });
});

export default router;
