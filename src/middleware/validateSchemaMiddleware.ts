import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    res.locals.validated = req.body;
    next();
  };
}
