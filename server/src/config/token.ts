import jwt from "jsonwebtoken";

export const generateToken = (id: any) => {
  const secret = process.env.JWT_TOKEN;
  if (!secret) throw new Error("JWT SECRET is not defined");
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};
