import prisma from '../config/database.js';
import { User } from '@prisma/client';

export async function createUser(newUser: SignData) {
  return await prisma.user.create({
    data: newUser,
  });
}

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export type SignData = Omit<User, 'id'>;
