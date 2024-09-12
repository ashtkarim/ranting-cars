import { Request, Response } from "express";
import {Car,ICar} from "../models/Car"

export const createCar = async (req:Request,res:Response)=>{
    const ownerId= req.userData as string ;
    

    const car:ICar = req.body;
    car.agencyId=ownerId
    if(!car.make || !car.model || !car.year || !car.licensePlate|| !car.price || !car.mileage || !car.vin || !car.imageUrl){
        return res.status(400).json({message:"all fields are required"})
    }

    try {
        await Car.create(car);
        res.status(200).json({ message:"car added seccefully "});
      } catch (error) {
        res.status(500).json({ error: "Error creating car", details: error });
      }
}

export const getAllCars = async (req:Request,res:Response)=>{
  const max = parseInt(req.query.max as string);
    try {
        const cars = await Car.find({});
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching cars", details: error });
    }
}

export const getCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const car = await Car.findById(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: "Error fetching car", details: error });
    }
  };

export const updateCar =async (req:Request,res:Response) =>{
    const {id} =req.params



    const newCar : ICar = req.body;

    try {
        const car = await Car.findByIdAndUpdate(id,newCar,{new:true});
        if(!car){
            return res.status(404).json({message:"car not found"})
        }
        res.status(200).json(car);
      } catch (error) {
        res.status(500).json({ error: "Error updating car", details: error });
      }

}

export const getMyCars =async (req:Request,res:Response)=>{
    try {
        const cars= await Car.find({agencyId:req.userData})
        return res.status(200).json({cars})
    } catch (error) {
        return res.status(500).json({message:"500 internal server error "})
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        await Car.deleteOne({_id:id});
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting car", details: error });
    }
};