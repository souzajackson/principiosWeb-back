import { Router } from "express";
import { ShelterService } from "../services/ShelterService";

const router = Router();
const service = new ShelterService();

router.post("/", async (req, res) => {
  const shelter = await service.createShelter(req.body);
  res.status(201).json(shelter);
});

router.get("/", async (_, res) => {
  res.json(await service.getAllShelters());
});

router.get("/:id", async (req, res) => {
  res.json(await service.getShelterById(Number(req.params.id)));
});

router.put("/:id", async (req, res) => {
  await service.updateShelter(Number(req.params.id), req.body);
  res.json({ message: "Abrigo atualizado" });
});

router.delete("/:id", async (req, res) => {
  await service.deleteShelter(Number(req.params.id));
  res.json({ message: "Abrigo removido" });
});

export default router;
