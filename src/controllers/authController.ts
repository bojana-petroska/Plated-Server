import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/types.js';
import { User } from '../database/entities/User.js';
import { AppDataSource } from '../database/ormconfig.js';

const userRepository = AppDataSource.getRepository(User);

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = ({
  user,
  JWT_SECRET,
}: {
  user: IUser;
  JWT_SECRET: string;
}) => {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const generateRefreshToken = ({
  user,
  JWT_REFRESH_SECRET,
}: {
  user: IUser;
  JWT_REFRESH_SECRET: string;
}) => {
  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  return refreshToken;
};

const signUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password', hashedPassword);
    const newUser = {
      userName,
      email,
      password: hashedPassword,
      address: '',
      phoneNumber: '',
      createdAt: new Date(),
    };
    await userRepository.save(newUser);
    res.status(201).send({
      message: 'User created successfully.',
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      res.status(404).send('User Not Found!');
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).send('Password in wrong');
      return;
    }
    if (!JWT_SECRET) {
      res.status(500).send('Secret Not Found');
      return;
    }
    const token = generateAccessToken({ user, JWT_SECRET });
    if (!JWT_REFRESH_SECRET) {
      res.status(500).send('Refresh secret Not Found');
      return;
    }
    const refreshToken = generateRefreshToken({ user, JWT_REFRESH_SECRET });

    user.refreshToken = refreshToken;

    await userRepository.save(user);

    res.status(200).send({
      success: true,
      message: 'User signed in successfully.',
      data: { token, refreshToken },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const handelRefreshTokenGeneration = async (req: Request, res: Response) => {
  const refreshToken: string = req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).send('refreshtoken required');
    return;
  }
  try {
    const user = await userRepository.findOneBy({ refreshToken });
    console.log(user);
    if (!user) {
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
      const token = generateAccessToken({ user, JWT_SECRET });
      res.status(200).send({ token });
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export default {
  signUp,
  signIn,
  handelRefreshTokenGeneration,
};
