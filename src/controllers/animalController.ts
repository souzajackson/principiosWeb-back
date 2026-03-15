import { Request, Response, NextFunction } from "express";
import { AnimalService } from "../services/AnimalService";
import { Shelter } from "../models/Shelter";
import { Animal } from "../models/Animal";
import { BadRequestError, NotFoundError } from "../middleware/HttpErrors";

const service = new AnimalService();

/**
 * 🔥 Função interna para transformar Animal -> formato do Front
 */
const mapAnimalToResponse = (animal: any) => {
  return {
    id: animal.id,
    name: animal.name,
    species: animal.species, // já está dog | cat
    breed: animal.breed,
    age: animal.age,
    gender: animal.gender,
    size: animal.size,
    photoUrl: animal.photoUrl,
    description: animal.description,
    personality: animal.personality ?? [],
    healthStatus: animal.healthStatus ?? "",
    vaccinated: animal.vaccinated ?? false,
    neutered: animal.neutered ?? false,
    shelterName: animal.shelter?.name ?? "",
    shelterPhone: animal.shelter?.phone ?? "",
    shelterEmail: animal.shelter?.email ?? "", // ainda não existe no model
    shelterId: animal.shelter?.id ?? -1,
    location: animal.shelter?.address ?? "",
  };
};

export const createAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    const shelter = await Shelter.findOne({
      where: { userId: user.id },
    });

    if (!shelter) {
      throw new NotFoundError("Shelter não encontrado para este usuário");
    }

    const {
      name,
      species,
      age,
      gender,
      breed,
      photoUrl,            // ← vem do front
      description,
      size,
      personality,
      healthStatus,
      vaccinated,
      neutered,
    } = req.body;

    const animal = await service.createAnimal({
      name,
      species,
      age: Number(age),
      gender,
      breed,
      photoUrl: photoUrl,  // ← mapeamento correto
      description: description || "",
      size: size || "Médio",
      personality: personality,
      healthStatus: healthStatus || "Saudável",
      vaccinated: vaccinated ?? false,
      neutered: neutered ?? false,
      shelterId: shelter.id,
    });

    const createdAnimal = await Animal.findByPk(animal.id, {
      include: [{ model: Shelter, as: 'shelter' }],
    });

    return res.status(201).json(mapAnimalToResponse(createdAnimal));
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      return next(error);
    }
    console.error("Error creating animal:", error);
    return res.status(500).json({ message: "Error creating animal" });
  }
};

export const getAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.findAll({
      include: [{ model: Shelter, as: 'shelter' }],
    });

    res.json(animals.map(mapAnimalToResponse));
  } catch (error) {
    res.status(500).json({ message: "Error fetching animals", error });
  }
};

export const getAnimalById = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findByPk(Number(req.params.id), {
      include: [{ model: Shelter, as: 'shelter' }],
    });

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.json(mapAnimalToResponse(animal));
  } catch (error) {
    res.status(500).json({ message: "Error fetching animal", error });
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    await service.updateAnimal(Number(req.params.id), req.body, userId);

    const updatedAnimal = await Animal.findByPk(Number(req.params.id), {
      include: [{ model: Shelter, as: 'shelter' }],
    });

    res.json(mapAnimalToResponse(updatedAnimal));
  } catch (error) {
    res.status(500).json({ message: "Error updating animal", error });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await service.deleteAnimal(Number(req.params.id), userId);
    res.json({ message: "Animal removido" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting animal", error });
  }
};

export const searchAnimals = async (req: Request, res: Response) => {
  try {
    const { species, gender, size, name } = req.query;

    const where: any = {};

    if (species) where.species = species;
    if (gender) where.gender = gender;
    if (size) where.size = size;

    if (name) {
      where.name = {
        [require("sequelize").Op.iLike]: `%${name}%`,
      };
    }

    const animals = await Animal.findAll({
      where,
      include: [{ model: Shelter, as: 'shelter' }],
    });

    res.json(animals.map(mapAnimalToResponse));
  } catch (error) {
    console.error("Error searching animals:", error);
    res.status(500).json({ message: "Error searching animals", error });
  }
};