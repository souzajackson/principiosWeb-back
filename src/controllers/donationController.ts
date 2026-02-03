import { Request, Response } from "express";
import { DonationService } from "../services/DonationService";

const service = new DonationService();

export const createDonation = async (req: Request, res: Response) => {
  try {
    const donation = await service.createDonation(req.body);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Error creating donation", error });
  }
};

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await service.getAllDonations();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
};

export const getDonationById = async (req: Request, res: Response) => {
  try {
    const donation = await service.getDonationById(Number(req.params.id));
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donation", error });
  }
};

export const deleteDonation = async (req: Request, res: Response) => {
  try {
    await service.deleteDonation(Number(req.params.id));
    res.json({ message: "Doação removida" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donation", error });
  }
};