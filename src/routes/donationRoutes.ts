import { Router } from "express";
import { DonationRepository } from "../repository/DonationRepository";

const router = Router();
const repo = new DonationRepository();

router.post("/", async (req, res) => {
  res.status(201).json(await repo.createDonation(req.body));
});

router.get("/", async (_, res) => {
  res.json(await repo.getAllDonations());
});

router.get("/:id", async (req, res) => {
  res.json(await repo.getDonationById(Number(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  await repo.deleteDonation(Number(req.params.id));
  res.json({ message: "Doação removida" });
});

export default router;
