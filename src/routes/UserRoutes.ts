import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

// Rota pública (criar usuário)
router.post("/", createUser);

// Rotas protegidas
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;