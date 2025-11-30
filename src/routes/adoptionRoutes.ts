import { Router } from "express";
import { AdoptionRepository } from "../repository/AdoptionRepository";

const router = Router();
const repo = new AdoptionRepository();

router.post("/", async (req, res) => {
  res.status(201).json(await repo.createAdoption(req.body));
});

router.get("/", async (_, res) => {
  res.json(await repo.getAllAdoptions());
});

router.get("/:id", async (req, res) => {
  res.json(await repo.getAdoptionById(Number(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  await repo.deleteAdoption(Number(req.params.id));
  res.json({ message: "Adoção removida" });
});

export default router;
