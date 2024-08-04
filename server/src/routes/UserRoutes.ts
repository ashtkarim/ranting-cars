import express from "express";
import { registerUser, login } from "../Controllers/UserControllers";

let UserRoutes = express();

UserRoutes.post("/login", login);
UserRoutes.post("/register", registerUser);

export default UserRoutes;
