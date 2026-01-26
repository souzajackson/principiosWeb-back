import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter,
} from "../controllers/shelterController";

const router = Router();

// GET pode ser público (para visitantes verem os abrigos)
router.get("/", getAllShelters);
router.get("/:id", getShelterById);

// Rotas protegidas
router.post("/", authenticate, createShelter);
router.put("/:id", authenticate, updateShelter);
router.delete("/:id", authenticate, deleteShelter);

export default router;