import Joi from 'joi';
import { SignData } from '../repositories/userRepository';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,30}$/;

export const signSchema = Joi.object<SignData>({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().regex(passwordRegex).required(),
});
