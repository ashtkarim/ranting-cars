import express from "express";
import {verifyToken} from "../config/middleware";
import { createCar,getAllCars,getCarById,getMyCars,updateCar } from "../Controllers/CarControllers";

let CarRoutes = express();

CarRoutes.get('/mycars',verifyToken,getMyCars)
CarRoutes.post('/',verifyToken,createCar)
CarRoutes.get('/',getAllCars)
CarRoutes.get('/:id',getCarById)
CarRoutes.put('/:id',updateCar)

export default CarRoutes;
