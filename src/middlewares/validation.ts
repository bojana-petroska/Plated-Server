import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AppDataSource } from '../database/ormconfig.js'
import { User } from '../database/entities/User.js';

const userRepository = AppDataSource.getRepository(User);

const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})"))
    .required()
    .messages({
      "string.pattern.base": "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one special character.",
    }),
});

const validator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const existingUser = await userRepository.findOne({
    where: [{ userName: req.body.userName }, { email: req.body.email }],
  });

  if (existingUser) {
    res.status(400).send("Username or email already in use.");
  } else {
    next();
  }
};

export default validator;
