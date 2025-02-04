import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/ormconfig.js';
import { IUser } from '../types/types.js';
import { User } from '../database/entities/User.js';
import userRepo from '../database/repositories/userRepository.js';

const userRepository = AppDataSource.getRepository(User);
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const JWT_SECRET =
  'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273';
const JWT_REFRESH_SECRET =
  '00ba9e45d8a6a4918ec0fa1741161f4c268f82fb693511c957c3244f421f7ac6d651dfb01d0530f7a0d35f5bca798e161848dba44d06d232e48907d8ef3df688';

const generateAccessToken = ({
  user,
  JWT_SECRET,
}: {
  user: IUser;
  JWT_SECRET: string;
}) => {
  const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const generateRefreshToken = ({
  user,
  JWT_REFRESH_SECRET,
}: {
  user: IUser;
  JWT_REFRESH_SECRET: string;
}) => {
  const refreshToken = jwt.sign({ user_id: user.user_id }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  return refreshToken;
};

const signUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  console.log(JWT_SECRET);
  try {
    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      res.status(500).send('JWT secrets are missing.');
      return;
    }

    // console.log('hashed password!:', hashedPassword)
    const user = await userRepo.createUser({ userName, email, password });
    console.log('STORED PASSWORD', user.password);

    res.status(201).send({
      message: 'User created successfully.',
      userName: user.userName,
    });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message === 'Username or email already exists.'
    ) {
      res.status(400).send({ message: 'Username or email already exists.' });
    } else {
      res.status(400).send({ message: 'User not created.', err });
    }
  }
};

const signIn = async (req: Request, res: Response) => {
  // console.log(req.body)
  const { userName, password } = req.body;
  console.log('INPUT PASSWORD:', password);
  try {
    const user = await userRepository.findOneBy({ userName });
    console.log('FOUND USER:', user);
    if (!user) {
      res.status(404).send('User Not Found!');
      return;
    }

    console.log('Stored Hashed Password:', user.password);
    console.log('Input password for comparison:', password);
    const isMatch = await bcrypt.compare(password, user.password);
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
    const token = generateAccessToken({ user, JWT_SECRET });
    const refreshToken = generateRefreshToken({ user, JWT_REFRESH_SECRET });

    user.token = token;
    user.refreshToken = refreshToken;

    await userRepository.save(user);

    res.status(200).send({
      success: true,
      message: 'User signed in successfully.',
      data: { userName, token, refreshToken, user_id: user.user_id },
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
  } catch (err: unknown) {
    res.status(500).send({ message: 'Server Error' });
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  signUp,
  signIn,
  handleRefreshTokenGeneration,
};
