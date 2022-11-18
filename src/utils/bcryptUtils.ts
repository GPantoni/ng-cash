import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, saltRounds);
}

export function validatePassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
