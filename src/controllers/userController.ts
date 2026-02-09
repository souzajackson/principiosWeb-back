import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    console.error("ERRO NO SEQUELIZE:", error.name, error.message); 
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await service.getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await service.updateUser(Number(req.params.id), req.body);
    res.json({ message: "Usuário atualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await service.deleteUser(Number(req.params.id));
    res.json({ message: "Usuário removido" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};