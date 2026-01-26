import { Request, Response } from "express";
import { AnimalService } from "../services/AnimalService";

const service = new AnimalService();

export const createAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await service.createAnimal(req.body);
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error creating animal", error });
  }
};

export const getAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await service.getAllAnimals();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching animals", error });
  }
};

export const getAnimalById = async (req: Request, res: Response) => {
  try {
    const animal = await service.getAnimalById(Number(req.params.id));
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching animal", error });
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    await service.updateAnimal(Number(req.params.id), req.body);
    res.json({ message: "Animal atualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error updating animal", error });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    await service.deleteAnimal(Number(req.params.id));
    res.json({ message: "Animal removido" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting animal", error });
  }
};