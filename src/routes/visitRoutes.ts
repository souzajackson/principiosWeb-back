import { Router } from "express";
import { VisitRepository } from "../repository/VisitRepository";

const router = Router();
const repo = new VisitRepository();

router.post("/", async (req, res) => {
  res.status(201).json(await repo.createVisit(req.body));
});

router.get("/", async (_, res) => {
  res.json(await repo.getAllVisits());
});

router.get("/:id", async (req, res) => {
  res.json(await repo.getVisitById(Number(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  await repo.deleteVisit(Number(req.params.id));
  res.json({ message: "Visita removida" });
});

export default router;
