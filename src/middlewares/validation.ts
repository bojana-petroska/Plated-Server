import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    next();
  }
};

export default validator;
