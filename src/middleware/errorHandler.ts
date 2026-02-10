import { Request, Response, NextFunction } from "express";
import { BadRequestError, Forbidden, NotFoundError } from "./HttpErrors";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error.name, error.message);

  if (error instanceof BadRequestError) {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof Forbidden) {
    return res.status(403).json({ message: error.message });
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  // Erro genérico
  res.status(500).json({ message: "Internal server error", error: error.message });
};