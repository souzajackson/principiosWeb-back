import { Request, Response, NextFunction } from "express";
import { ShelterService } from "../services/ShelterService";
import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";

const service = new ShelterService();

export const createShelter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    const { name, address, phone } = req.body;

    const shelter = await service.createShelter({
      name,
      address,
      phone,
      userId: user.id,
    });

    return res.status(201).json(shelter);
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return next(error);
    }
    
    console.error("Error creating shelter:", error);
    return res.status(500).json({ message: "Error creating shelter" });
  }
};

export const getAllShelters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shelters = await service.getAllShelters();
    return res.json(shelters);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    return res.status(500).json({ message: "Error fetching shelters" });
  }
};

export const getShelterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shelter = await service.getShelterById(Number(req.params.id));
    return res.json(shelter);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    
    console.error("Error fetching shelter:", error);
    return res.status(500).json({ message: "Error fetching shelter" });
  }
};

export const updateShelter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    await service.updateShelter(Number(req.params.id), req.body, userId);
    return res.json({ message: "Abrigo atualizado" });
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      return next(error);
    }
    
    console.error("Error updating shelter:", error);
    return res.status(500).json({ message: "Error updating shelter" });
  }
};

export const deleteShelter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    await service.deleteShelter(Number(req.params.id), userId);
    return res.json({ message: "Abrigo removido" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    
    console.error("Error deleting shelter:", error);
    return res.status(500).json({ message: "Error deleting shelter" });
  }
};