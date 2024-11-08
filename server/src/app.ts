import express, { Request, Response } from "express";
import cookieParser from "cookie-parser"; 
import authRoute from "./routes/authRoutes";
import carRoute from "./routes/CarRoutes";
import agancyRoutes from "./routes/agencyRoutes";
const cors = require("cors");
import connectDB from "./config/db";
import multer from "multer";

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ exposedHeaders: ['Token'] }));
app.options("*", cors());

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
      cb(null, 'public/images'); 
  },
  filename: (req: any, file: any, cb: any) => {
      cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage:storage });

app.get("/", (req: Request, res: Response) => {
  res.send("server is working");
});
app.post("/uploadImage",upload.single('file'),(req:Request,res:Response)=>{
  console.log(req.file)
return res.send(req.file)
})

app.use("/auth", authRoute);
app.use("/car", carRoute);
app.use("/agency", agancyRoutes);



app.listen("4000", () => {
  console.log("Server is runing ");
});
