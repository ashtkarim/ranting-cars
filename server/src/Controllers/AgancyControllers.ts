import { Request, Response } from "express";
import { Agency,IAgency } from '../models/Agency';

export const getAgencies = async (req: Request, res: Response):Promise<Response>  => {
  try {
    const agencies: IAgency[] = await Agency.find({},{"password":0});
    return  res.status(200).json(agencies);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch agencies' });
  }
};

export const getAgencyById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const agency = await Agency.findById(id);
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found' });
    }
    const { password, ...agencyData } = agency.toObject();
    return res.status(200).json(agencyData);
  } catch (error) {
    console.error('Error fetching agency:', error);
    return res.status(500).json({ error: 'Failed to fetch agency' });
  }
};
