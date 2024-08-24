import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  try {
    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const token: string = generateToken(findUser.id);
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: findUser.id,
          email: findUser.email,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
        },
      });
    } else {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res
      .status(500)
      .json({ message: "Error in registering user", error });
  }
};

export default { registerUser, login };
