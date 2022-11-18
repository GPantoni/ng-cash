import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export async function signUp(req: Request, res: Response) {
  await userService.signUp(res.locals.validated);

  res.sendStatus(201);
}
