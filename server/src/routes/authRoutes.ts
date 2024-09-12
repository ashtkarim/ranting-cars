import express from "express";
import {  me, registerUser,login } from "../Controllers/authController";
import { authenticateToken} from "../middleware/auth";

let UserRoutes = express();

UserRoutes.post("/login", login);
UserRoutes.post("/register", registerUser);
UserRoutes.get("/me", authenticateToken, me);

export default UserRoutes;