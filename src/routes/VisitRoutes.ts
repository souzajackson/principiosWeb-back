import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createVisit,
  getAllVisits,
  getVisitById,
  deleteVisit,
  getMyVisits,
} from "../controllers/visitController";

const router = Router();

// Todas as rotas protegidas
router.post("/", authenticate, createVisit);
router.get("/", authenticate, getAllVisits);
router.get("/me", authenticate, getMyVisits);
router.get("/:id", authenticate, getVisitById);
router.delete("/:id", authenticate, deleteVisit);

export default router;