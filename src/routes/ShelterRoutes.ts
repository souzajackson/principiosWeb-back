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

// apenas usuários do tipo SHELTER podem criar
router.post("/", authenticate, authorize("SHELTER"), createShelter);

router.put("/:id", authenticate, updateShelter);
router.delete("/:id", authenticate, deleteShelter);

export default router;
