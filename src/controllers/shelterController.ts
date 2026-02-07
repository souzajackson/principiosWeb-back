import { Request, Response } from "express";
import { ShelterService } from "../services/ShelterService";

const service = new ShelterService();

export const createShelter = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { name, address, phone } = req.body;

    const shelter = await service.createShelter({
      name,
      address,
      phone,
      userId: user.id // pega do token
    });

    return res.status(201).json(shelter);
  } catch (error) {
    return res.status(500).json({ message: "Error creating shelter" });
  }
};

export const getAllShelters = async (req: Request, res: Response) => {
  try {
    const shelters = await service.getAllShelters();
    res.json(shelters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shelters", error });
  }
};

export const getShelterById = async (req: Request, res: Response) => {
  try {
    const shelter = await service.getShelterById(Number(req.params.id));
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    res.json(shelter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shelter", error });
  }
};

export const updateShelter = async (req: Request, res: Response) => {
  try {
    await service.updateShelter(Number(req.params.id), req.body);
    res.json({ message: "Abrigo atualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error updating shelter", error });
  }
};

export const deleteShelter = async (req: Request, res: Response) => {
  try {
    await service.deleteShelter(Number(req.params.id));
    res.json({ message: "Abrigo removido" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shelter", error });
  }
};