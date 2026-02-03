import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createAdoption,
  getAllAdoptions,
  getAdoptionById,
  deleteAdoption,
} from "../controllers/adoptionController";

const router = Router();

// Todas as rotas protegidas
router.post("/", authenticate, createAdoption);
router.get("/", authenticate, getAllAdoptions);
router.get("/:id", authenticate, getAdoptionById);
router.delete("/:id", authenticate, deleteAdoption);

export default router;