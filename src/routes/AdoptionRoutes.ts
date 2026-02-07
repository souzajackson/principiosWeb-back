import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";

import {
  createAdoption,
  getAllAdoptions,
  getAdoptionById,
  deleteAdoption,
  approveAdoption,
  rejectAdoption
} from "../controllers/adoptionController";

const router = Router();

// USER cria pedido de adoção
router.post("/", authenticate, authorize("USER"), createAdoption);

// listar adoções (pode ser ambos)
router.get("/", authenticate, getAllAdoptions);
router.get("/:id", authenticate, getAdoptionById);

// remover (opcional: apenas SHELTER)
router.delete("/:id", authenticate, deleteAdoption);

// SHELTER aprova / rejeita
router.put("/:id/approve",
  authenticate,
  authorize("SHELTER"),
  approveAdoption
);

router.put("/:id/reject",
  authenticate,
  authorize("SHELTER"),
  rejectAdoption
);

export default router;
