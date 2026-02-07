import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);

router.post("/", authenticate, authorize("SHELTER"), createAnimal);
router.put("/:id", authenticate, authorize("SHELTER"), updateAnimal);
router.delete("/:id", authenticate, authorize("SHELTER"), deleteAnimal);

export default router;