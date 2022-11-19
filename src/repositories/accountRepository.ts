import prisma from '../config/database.js';

export async function createAccount(userId: number) {
  return await prisma.account.create({
    data: {
      userId,
    },
  });
}
