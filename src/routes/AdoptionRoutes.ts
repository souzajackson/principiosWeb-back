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
  getMyAdoptions,
  getMyShelterAdoptions,
} from "../controllers/adoptionController";

const router = Router();

// ✅ ROTAS ESPECÍFICAS PRIMEIRO

router.get("/my", authenticate, getMyAdoptions);

router.get(
  "/shelter",
  authenticate,
  authorize("SHELTER", "SUPER"),
  getMyShelterAdoptions
);

// ✅ Depois rota dinâmica NUMÉRICA
router.get("/:id", authenticate, getAdoptionById);

// ✅ Outras rotas

router.post("/", authenticate, authorize("USER"), createAdoption);

router.patch("/:id/approve", authenticate, authorize("SHELTER"), approveAdoption);

router.patch("/:id/reject", authenticate, authorize("SHELTER"), rejectAdoption);

router.get("/", authenticate, getAllAdoptions);

router.delete("/:id", authenticate, deleteAdoption);

export default router;