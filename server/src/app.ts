import express, { Request, Response } from "express";
import cookieParser from "cookie-parser"; 
import authRoute from "./routes/authRoutes";
import carRoute from "./routes/CarRoutes";
import agancyRoutes from "./routes/agencyRoutes";
const cors = require("cors");
import connectDB from "./config/db";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ exposedHeaders: ['Token'] }));
app.options("*", cors());

connectDB();
app.get("/", (req: Request, res: Response) => {
  res.send("server is working");
});

app.use("/auth", authRoute);
app.use("/car", carRoute);
app.use("/agency", agancyRoutes);



app.listen("4000", () => {
  console.log("Server is runing ");
});
