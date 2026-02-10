import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  deleteDonation,
} from "../controllers/donationController";
import { authorize } from "../middleware/authorize";

const router = Router();

// Qualquer User
router.get("/:id", authenticate, getDonationById);

// Apenas USER
router.post("/", authenticate, authorize("USER"), createDonation);

// Apenas SHELTER
router.delete("/:id", authenticate, authorize("SHELTER"), deleteDonation);

// SUPER USER
router.get("/", authenticate, authorize(), getAllDonations);
export default router;