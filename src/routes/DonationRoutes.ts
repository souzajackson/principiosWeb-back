import { Router } from "express";
import { DonationService } from "../services/DonationService";

const router = Router();
const service = new DonationService();

router.post("/", async (req, res) => {
  res.status(201).json(await service.createDonation(req.body));
});

router.get("/", async (_, res) => {
  res.json(await service.getAllDonations());
});

router.get("/:id", async (req, res) => {
  res.json(await service.getDonationById(Number(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  await service.deleteDonation(Number(req.params.id));
  res.json({ message: "Doação removida" });
});

export default router;
