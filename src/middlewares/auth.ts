import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../database/entities/User.js';
import { Restaurant } from '../database/entities/Restaurant.js';
import { AppDataSource } from '../database/ormconfig.js';

const userRepository = AppDataSource.getRepository(User);
const restaurantRepository = AppDataSource.getRepository(Restaurant);

const JWT_SECRET =
  'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273';

export const userAuth = async (
  req: Request & { user?: User; payload?: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log('Received Token:', token);
  if (!token) {
    res.status(401).send('No token provided');
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as {
      user_id: number;
    };
    const user = await userRepository.findOneBy({ user_id: decoded.user_id });
    if (!user) {
      res.status(401).send({ message: 'Invalid token: User not found' });
      return;
    }
    req.payload = {
      user_id: user.user_id,
      userName: user.userName,
      email: user.email,
    };
    console.log('USER FROM REQ', req.user);
    next();
  } catch (err: unknown) {
    res.status(401).send({ message: 'Unauthorized', err });
  }
};

export const restaurantAuth = async (
  req: Request & { restaurant?: Restaurant; payload?: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Authorization Header:", req.headers['authorization']);
  console.log('Received Token Restaurant:', token);
  if (!token) {
    res.status(401).send('No token provided');
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as {
      restaurant_id: number;
    };
    console.log("Decoded Token:", decoded);
    const restaurant = await restaurantRepository.findOneBy({
      restaurant_id: decoded.restaurant_id,
    });
    if (!restaurant) {
      res.status(401).send({ message: 'Invalid token: User not found' });
      return;
    }
    req.payload = {
      restaurant_id: restaurant.restaurant_id,
      name: restaurant.name,
      isOpen: restaurant.isOpen,
    };
    next();
  } catch (err: unknown) {
    res.status(401).send({ message: 'Unauthorized', err });
  }
};
