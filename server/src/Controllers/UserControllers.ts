import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token";
import User, { IUser } from "../Models/User";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required !" });
  }
  const findUser = await User.findOne({ email });
  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    const token: string = generateToken(findUser._id as string);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: findUser._id,
        email: findUser.email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      },
    });
  } else {
    res.status(400).json({ message: "Incorrect Email or Password" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: "Name, email and password are required" });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    res.status(400).json({ message: "Email already exists" });
  }
  try {
    const hashedPasswd = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPasswd,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in registring User ", error });
  }
};

export default { registerUser, login };
