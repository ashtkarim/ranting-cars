import { Request, Response } from "express";
import { Agency,IAgency } from '../models/Agency';

export const getAgencies = async (req: Request, res: Response)  => {
  try {
    const agencies: IAgency[] = await Agency.find({},{"password":0});
    return  res.status(200).json(agencies);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch agencies' });
  }
};

export const getAgencyById = async (req: Request, res: Response)  => {
  const { id } = req.params;
  try {
    const agencyfind = await Agency.findById(id);
    if (!agencyfind) {
      return res.status(404).json({ error: 'Agency not found' });
    }
    return res.status(200).json(agencyfind);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch agency' });
  }
};

// // Update an Agency
// exports.updateAgency = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { Agency } = req.body;

//   try {
//     const agency = await prisma.agency.update({
//       where: { id },
//       data: Agency,
//     });

//     res.status(200).json(agency);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update agency' });
//   }
// };

// // Delete an Agency
// exports.deleteAgency = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     await prisma.agency.delete({
//       where: { id },
//     });

//     res.status(200).json({ message: 'Agency deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete agency' });
//   }
// };
