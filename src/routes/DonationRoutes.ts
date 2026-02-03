import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  deleteDonation,
} from "../controllers/donationController";

const router = Router();

// Todas as rotas protegidas
router.post("/", authenticate, createDonation);
router.get("/", authenticate, getAllDonations);
router.get("/:id", authenticate, getDonationById);
router.delete("/:id", authenticate, deleteDonation);

export default router;