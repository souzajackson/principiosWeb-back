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

router.get("/", getAllAnimals); // Trocar pra SUPER USER se tiver paginacao

// Qualquer User
router.get("/:id", getAnimalById);

//Apenas SHELTER
router.post("/", authenticate, authorize("SHELTER"), createAnimal);
router.put("/:id", authenticate, authorize("SHELTER"), updateAnimal);
router.delete("/:id", authenticate, authorize("SHELTER"), deleteAnimal);

export default router;