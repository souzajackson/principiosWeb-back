import { Router } from "express";
import { AdoptionService } from "../services/AdoptionService";

const router = Router();
const service = new AdoptionService();

router.post("/", async (req, res) => {
  res.status(201).json(await service.createAdoption(req.body));
});

router.get("/", async (_, res) => {
  res.json(await service.getAllAdoptions());
});

router.get("/:id", async (req, res) => {
  res.json(await service.getAdoptionById(Number(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  await service.deleteAdoption(Number(req.params.id));
  res.json({ message: "Adoção removida" });
});

export default router;
