import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Car, ICar } from "../models/Car";

declare global {
  namespace Express {
    interface Request {
      userData?: string;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers["token"] as string;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.userData = user.id;
    next();
  });
};

export const authorizeCarOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.userData) return res.sendStatus(401);
  const carId = req.params.id as string;
  const car: ICar | null = await Car.findOne({ _id: carId });
  const agencyId = car?.agencyId?.toString();

  if (!car) return res.status(404).json({ message: "Car not found" });
  if (agencyId !== req.userData) return res.sendStatus(403);
  next();
};
