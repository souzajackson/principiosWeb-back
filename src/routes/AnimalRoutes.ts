import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  searchAnimals
} from "../controllers/animalController";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/", getAllAnimals, authorize()); // Trocar pra SUPER USER se tiver paginacao

// Qualquer User
router.get("/search", searchAnimals);
router.get("/:id", getAnimalById);

//Apenas SHELTER
router.post("/", authenticate, authorize("SHELTER"), createAnimal);
router.put("/:id", authenticate, authorize("SHELTER"), updateAnimal);
router.delete("/:id", authenticate, authorize("SHELTER"), deleteAnimal);

export default router;