import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const prisma= new PrismaClient()

export const createCar = async (req:Request,res:Response)=>{
    const ownerId= req.userData as string ;
    

    const { make, model, year, color, price, mileage, vin,imageUrl } = req.body;
    console.log()
    if(!make || !model || !year || !color || !price || !mileage || !vin || !imageUrl){
        return res.status(400).json({message:"all fields are required"})
    }

    try {
        const car = await prisma.car.create({
            data:{
                make,
                model,
                year,
                color,
                price,
                mileage,
                vin,
                imageUrl,
                ownerId,
        }});
        res.status(200).json({ message:"car added seccefully "});
      } catch (error) {
        res.status(500).json({ error: "Error creating car", details: error });
      }
}

export const getAllCars = async (req:Request,res:Response)=>{
  const max = parseInt(req.query.max as string);
    try {
        const cars = await prisma.car.findMany({take:max});
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching cars", details: error });
    }
}

export const getCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const car = await prisma.car.findUnique({
        where: { id: id },
      });
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
    const ownerId= req.userData

    const awid =await prisma.car.findUnique({
        where:{id},
        select:{ownerId:true}
    })

    if(ownerId!==awid?.ownerId){
        return res.status(200).json({message:"only owner can change info of his car"})
    }

    const { make, model, year, color, price, mileage, vin,imageUrl} = req.body;

    try {
        const car = await prisma.car.update({
          where: { id },
          data: {
            make,
            model,
            year,
            color,
            price,
            mileage,
            vin,
            imageUrl,
            ownerId,
          },
        });
        res.status(200).json(car);
      } catch (error) {
        res.status(500).json({ error: "Error updating car", details: error });
      }

}

export const getMyCars =async (req:Request,res:Response)=>{
    const ownerId = req.userData;
    try {
        const cars= await prisma.car.findMany({
            where:{ownerId}
        })
        return res.status(200).json({cars})
    } catch (error) {
        return res.status(500).json({message:"500 internal server error "})
    }
}