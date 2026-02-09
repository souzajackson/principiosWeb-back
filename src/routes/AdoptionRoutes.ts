// routes/adoptionRoutes.ts
import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import {
  createAdoption,
  getAllAdoptions,
  getAdoptionById,
  deleteAdoption,
  approveAdoption,
  rejectAdoption,
} from "../controllers/adoptionController";

const router = Router();

router.get("/", authenticate, getAllAdoptions);
router.get("/:id", authenticate, getAdoptionById);

// Apenas USER pode criar solicitação de adoção
router.post("/", authenticate, authorize("USER"), createAdoption);

// Apenas SHELTER pode aprovar/rejeitar
router.patch("/:id/approve", authenticate, authorize("SHELTER"), approveAdoption);
router.patch("/:id/reject", authenticate, authorize("SHELTER"), rejectAdoption);

router.delete("/:id", authenticate, deleteAdoption);

export default router;