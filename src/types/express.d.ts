import { Request } from 'express';
import { User } from '../database/entities/User.ts';
import { Restaurant } from '../database/entities/Restaurant.ts';

declare global {
  namespace Express {
    interface Request {
      payload?: {
        user?: User;
        restaurant?: Restaurant;
      };
    }
  }
}
