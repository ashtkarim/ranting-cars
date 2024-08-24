import express, { Request, Response } from "express";
import connectDB from "./config/db";
import UserRoutes from "./routes/UserRoutes";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/", (req: Request, res: Response) => {
  res.send("server is working");
});

app.use("/user", UserRoutes);

app.listen("4000", () => {
  console.log("Server is runing ");
});
