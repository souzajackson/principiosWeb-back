import { Router } from "express";
import { VisitService } from "../services/VisitService";

const router = Router();
const service = new VisitService();

router.post("/", async (req, res) => {
  res.status(201).json(await service.createVisit(req.body));
});

router.get("/", async (_, res) => {
  res.json(await service.getAllVisits());
});

router.get("/:id", async (req, res) => {
  res.json(await service.getVisitById(Number(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  await service.deleteVisit(Number(req.params.id));
  res.json({ message: "Visita removida" });
});

export default router;
