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


// SUPER USER
router.delete("/:id", authenticate, authorize(), deleteDonation);
router.get("/", authenticate, authorize(), getAllDonations);
export default router;