import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRequest =
  (schema: { body?: Schema; query?: Schema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) {
        console.error('Query Validation Error:', error.details[0].message);
        res.status(400).send({ error: error.details[0].message });
        return;
      }
    }
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) {
        console.error('Body Validation Error:', error.details[0].message);
        res.status(400).send({ error: error.details[0].message });
        return;
      }
    }
    next();
  };
