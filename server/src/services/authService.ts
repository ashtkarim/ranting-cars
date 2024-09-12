import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (userData: {
  username: string;
  password: string;
  email: string;
  agencyName: string;
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      agency: {
        create: {
          name: userData.agencyName,
        },
      },
    },
    include: {
      agency: true,
    },
  });
  return { id: user.id, username: user.username, email: user.email, agencyId: user.agency?.id };
};

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ 
    where: { username },
    include: { agency: true },
  });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );
  return { 
    token, 
    user: { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      agencyId: user.agency?.id 
    } 
  };
};