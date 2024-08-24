import express, { Request, Response } from "express";
import UserRoutes from "./routes/UserRoutes";
import cookieParser from 'cookie-parser';
import verifyToken from "./config/middleware";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options("*", cors());

app.get("/", (req: Request, res: Response) => {
  res.send("server is working");
});

app.use("/user", UserRoutes);

app.get('/p', verifyToken, (req: Request, res: Response) => {
  const userData=req.userData;
  res.status(200).json({ message:userData });
});

app.listen("4000", () => {
  console.log("Server is runing ");
});
