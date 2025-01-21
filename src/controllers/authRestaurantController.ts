import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/ormconfig.js';
import { IRestaurant } from '../types/types.js';
import { Restaurant } from '../database/entities/Restaurant.js';
import restaurantRepo from '../database/repositories/restaurantRepository.js';

const restaurantRepository = AppDataSource.getRepository(Restaurant);

const JWT_SECRET =
  'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273';
const JWT_REFRESH_SECRET =
  '00ba9e45d8a6a4918ec0fa1741161f4c268f82fb693511c957c3244f421f7ac6d651dfb01d0530f7a0d35f5bca798e161848dba44d06d232e48907d8ef3df688';

const generateAccessToken = ({
  restaurant,
  JWT_SECRET,
}: {
  restaurant: IRestaurant;
  JWT_SECRET: string;
}) => {
  const token = jwt.sign(
    { name: restaurant.name, restaurant_id: restaurant.restaurant_id },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return token;
};

const generateRefreshToken = ({
  restaurant,
  JWT_REFRESH_SECRET,
}: {
  restaurant: IRestaurant;
  JWT_REFRESH_SECRET: string;
}) => {
  const refreshToken = jwt.sign(
    { name: restaurant.name, restaurant_id: restaurant.restaurant_id },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
};

const signUp = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  console.log(JWT_SECRET);
  try {
    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      res.status(500).send('JWT secrets are missing.');
      return;
    }

    // console.log('hashed password!:', hashedPassword)
    const restaurant = await restaurantRepo.createRestaurant({
      name,
      password,
    });
    console.log('STORED PASSWORD', restaurant.password);

    res.status(201).send({
      message: 'Restaurant created successfully.',
      name: restaurant.name,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Restaurant already exists.') {
      res.status(400).send({ message: 'Restaurant already exists.' });
    } else {
      res.status(400).send({ message: 'Restaurant not created.', err });
    }
  }
};

const signIn = async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, password } = req.body;
  console.log('INPUT PASSWORD:', password);
  try {
    const restaurant = await restaurantRepository.findOneBy({ name });
    if (!restaurant) {
      res.status(404).send('Restaurant Not Found!');
      return;
    }

    console.log('Stored Hashed Password:', restaurant.password);
    console.log('Input password for comparison:', password);
    const isMatch = await bcrypt.compare(password, restaurant.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      res.status(401).send('Password is wrong');
      return;
    }
    if (!JWT_SECRET) {
      res.status(500).send('Secret Not Found');
      return;
    }
    if (!JWT_REFRESH_SECRET) {
      res.status(500).send('Refresh secret Not Found');
      return;
    }
    const token = generateAccessToken({ restaurant, JWT_SECRET });
    console.log('Received Token Restaurant:', token);
    const refreshToken = generateRefreshToken({
      restaurant,
      JWT_REFRESH_SECRET,
    });

    restaurant.token = token;
    restaurant.refreshToken = refreshToken;

    await restaurantRepository.save(restaurant);

    res.status(200).send({
      success: true,
      message: 'User signed in successfully.',
      data: {
        name,
        token,
        refreshToken,
        restaurant_id: restaurant.restaurant_id,
      },
    });
  } catch (err: unknown) {
    res.status(500).send({ message: 'SignIn error:' });
  }
};

const handleRefreshTokenGeneration = async (req: Request, res: Response) => {
  const refreshToken: string = req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).send('Refresh Token required');
    return;
  }
  try {
    const restaurant = await restaurantRepository.findOneBy({ refreshToken });
    console.log(restaurant);

    if (!restaurant) {
      res.status(403).send('Invalid Refresh Token');
      return;
    }

    if (!JWT_REFRESH_SECRET) {
      res.status(500).send('Refresh secret Not Found');
      return;
    }

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decode) => {
      if (err) {
        res.status(403).send('Invalid Refresh Token');
        return;
      }

      if (!JWT_SECRET) {
        res.status(500).send('Secret Not Found');
        return;
      }

      const token = generateAccessToken({ restaurant, JWT_SECRET });
      res.status(200).send({ token });
    });
  } catch (err: unknown) {
    res.status(500).send({ message: 'Server Error' });
  }
};

export default {
  signUp,
  signIn,
  generateAccessToken,
  generateRefreshToken,
  handleRefreshTokenGeneration,
};
