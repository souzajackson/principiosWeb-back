import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    next(error); // Passa o erro para o middleware
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    await service.updateUser(Number(req.params.id), req.body, userId);
    res.json({ message: "Usuário atualizado" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    await service.deleteUser(Number(req.params.id), userId);
    res.json({ message: "Usuário removido" });
  } catch (error) {
    next(error);
  }
};