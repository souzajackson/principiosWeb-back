import { Request, Response } from "express";
import { VisitService } from "../services/VisitService";

const service = new VisitService();

export const createVisit = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const visit = await service.createVisit({
        userId: user.id,
        shelterId: req.body.shelterId,
        date: req.body.date
    });
    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({ message: "Error creating visit", error });
  }
};

export const getAllVisits = async (req: Request, res: Response) => {
  try {
    const visits = await service.getAllVisits();
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visits", error });
  }
};

export const getVisitById = async (req: Request, res: Response) => {
  try {
    const visit = await service.getVisitById(Number(req.params.id));
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visit", error });
  }
};

export const deleteVisit = async (req: Request, res: Response) => {
  try {
    await service.deleteVisit(Number(req.params.id));
    res.json({ message: "Visita removida" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting visit", error });
  }
};


export const getMyVisits = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const visits = await service.getVisitsByUserId(
      Number(user.id),
      String(user.role)
    );

    if (user.role === "USER") {
      return res.json(
        visits.map((visit: any) => ({
          id: visit.id,
          userId: visit.userId,
          shelterId: visit.shelterId,
          date: visit.date,
          shelter: visit.shelter
            ? {
                id: visit.shelter.id,
                name: visit.shelter.name,
                address: visit.shelter.address,
                phone: visit.shelter.phone,
              }
            : null,
        }))
      );
    } else {
      return res.json(
        visits.map((visit: any) => ({
          id: visit.id,
          visitDate: visit.date,
          visitTime: new Date(visit.date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Fortaleza",
          }),
          requestDate: visit.date,
          status: "confirmed",
          visitor: visit.visitor
            ? {
                id: visit.visitor.id,
                name: visit.visitor.name,
                email: visit.visitor.email,
                phone: "",
                address: "",
              }
            : null,
        }))
      );
    }
  } catch (error: any) {
    console.error("Error fetching visits:", error);
    res.status(500).json({
      message: "Error fetching visits",
      error: error?.message ?? error,
    });
  }
};