import jwt from "jsonwebtoken";
export const generateToken = (id: any) => {
  const secret = "hello1234";
  if (!secret) throw new Error("JWT SECRET is not defined");
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};
