import { Request, Response } from "express";
import { AdoptionService } from "../services/AdoptionService";

const service = new AdoptionService();

export const createAdoption = async (req: Request, res: Response) => {
  try {
    const adoption = await service.createAdoption(req.body);
    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Error creating adoption", error });
  }
};

export const getAllAdoptions = async (req: Request, res: Response) => {
  try {
    const adoptions = await service.getAllAdoptions();
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching adoptions", error });
  }
};

export const getAdoptionById = async (req: Request, res: Response) => {
  try {
    const adoption = await service.getAdoptionById(Number(req.params.id));
    if (!adoption) {
      return res.status(404).json({ message: "Adoption not found" });
    }
    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Error fetching adoption", error });
  }
};

export const deleteAdoption = async (req: Request, res: Response) => {
  try {
    await service.deleteAdoption(Number(req.params.id));
    res.json({ message: "Adoção removida" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting adoption", error });
  }
};