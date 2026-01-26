import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController";

const router = Router();

// GET all animals pode ser público (para visitantes verem)
router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);

// Rotas protegidas (apenas usuários autenticados)
router.post("/", authenticate, createAnimal);
router.put("/:id", authenticate, updateAnimal);
router.delete("/:id", authenticate, deleteAnimal);

export default router;