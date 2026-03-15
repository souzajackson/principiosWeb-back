import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter,
  getMyShelter,
} from "../controllers/shelterController";

const router = Router();


// apenas usuários do tipo SHELTER podem criar, editar ou deletar
router.get("/me", authenticate, authorize("SHELTER"), getMyShelter);
router.post("/", authenticate, authorize("SHELTER"), createShelter);
router.put("/:id", authenticate, authorize("SHELTER"), updateShelter);
router.delete("/:id", authenticate, authorize("SHELTER"), deleteShelter);

//todos
router.get("/", getAllShelters);
router.get("/:id", getShelterById);

export default router;
