import Joi from 'joi';

export const restaurantValidationSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})'))
      .required()
      .messages({
        'string.pattern.base':
          'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one special character.',
      }),
  }),
};
