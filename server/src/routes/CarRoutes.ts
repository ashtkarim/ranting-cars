import express from "express";
import verifyToken from "../config/middleware";

let CarRoutes = express();

CarRoutes.get("/hello");

export default CarRoutes;
