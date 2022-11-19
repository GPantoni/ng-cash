import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createToken(user: User) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: process.env.JWT_EXPIRATION,
  };
  return jwt.sign(payload, String(process.env.JWT_SECRET), options);
}

export function validateToken(token: string) {
  const verifiedToken = jwt.verify(token, String(process.env.JWT_SECRET));

  return verifiedToken;
}
