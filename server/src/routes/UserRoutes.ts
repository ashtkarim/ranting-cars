import express from "express";
import { me, registerUser, login } from "../Controllers/UserControllers";
import verifyToken from "../config/middleware";

let UserRoutes = express();

UserRoutes.post("/login", login);
UserRoutes.post("/register", registerUser);
UserRoutes.get("/me", verifyToken, me);

export default UserRoutes;
