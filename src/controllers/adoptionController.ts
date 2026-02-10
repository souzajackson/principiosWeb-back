// controllers/adoptionController.ts
import { Request, Response, NextFunction } from "express";
import { AdoptionService } from "../services/AdoptionService";
import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";

const service = new AdoptionService();

export const createAdoption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    
    const adoption = await service.createAdoption({
      userId: user.id,
      animalId: req.body.animalId
    });

    return res.status(201).json(adoption);
  } catch (error: any) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      return next(error);
    }
    console.error("Error creating adoption:", error);
    return res.status(500).json({ message: "Error creating adoption" });
  }
};

export const getAllAdoptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adoptions = await service.getAllAdoptions();
    return res.json(adoptions);
  } catch (error) {
    console.error("Error fetching adoptions:", error);
    return res.status(500).json({ message: "Error fetching adoptions" });
  }
};

export const getAdoptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adoption = await service.getAdoptionById(Number(req.params.id));
    return res.json(adoption);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    console.error("Error fetching adoption:", error);
    return res.status(500).json({ message: "Error fetching adoption" });
  }
};

export const deleteAdoption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteAdoption(Number(req.params.id));
    return res.json({ message: "Adoção removida" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    console.error("Error deleting adoption:", error);
    return res.status(500).json({ message: "Error deleting adoption" });
  }
};

export const approveAdoption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const adoptionId = Number(req.params.id);
    const adoption = await service.approveAdoption(adoptionId, userId);
    return res.json(adoption);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    console.error("Error approving adoption:", error);
    return res.status(500).json({ message: "Error approving adoption" });
  }
};

export const rejectAdoption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const adoptionId = Number(req.params.id);
    const adoption = await service.rejectAdoption(adoptionId, userId);
    return res.json(adoption);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    console.error("Error rejecting adoption:", error);
    return res.status(500).json({ message: "Error rejecting adoption" });
  }
};