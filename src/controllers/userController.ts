import { Request, Response } from 'express';
import userRepo from '../database/repositories/userRepository.js';

const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string)|| 10;
  try {
    const users = await userRepo.getUsers(page, limit);
    console.log(users)
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await userRepo.getUser(userId);
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res
      .status(404)
      .send(`The user with id: ${userId} is not found. Error: ${err}`);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userRepo.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(`User was not successfully created. Error: ${err}`);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const updatedUser = await userRepo.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(404)
      .send(`The user with id: ${userId} is not found. Error: ${err}`);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  try {
    const deletedUser = await userRepo.deleteOneUser(userId);
    if (!deletedUser) {
      res.status(404).send(`The user with id: ${userId} is not found.`);
    }
    res.status(200).send(`User deleted successfully.`);
  } catch (err) {
    res
      .status(500)
      .send(`The user with id: ${userId} is not found. Error: ${err}`);
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
