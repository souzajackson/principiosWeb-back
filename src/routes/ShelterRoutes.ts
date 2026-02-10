import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter,
} from "../controllers/shelterController";

const router = Router();

router.get("/", getAllShelters);
router.get("/:id", getShelterById);

// apenas usuários do tipo SHELTER podem criar, editar ou deletar
router.post("/", authenticate, authorize("SHELTER"), createShelter);
router.put("/:id", authenticate, authorize("SHELTER"), updateShelter);
router.delete("/:id", authenticate, authorize("SHELTER"), deleteShelter);

export default router;
