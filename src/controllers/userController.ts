import { Request, Response } from 'express';
import userRepository from '../database/repositories/userrepository';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await userRepository.getUser(userId);
    res.status(200).json(user);
  } catch (err) {
    res
      .status(404)
      .send(`The user with id: ${userId} is not found. Error: ${err}`);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userRepository.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(`User was not successfully created. Error: ${err}`);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const updatedUser = await userRepository.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(404)
      .send(`The user with id: ${userId} is not found. Error: ${err}`);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const deletedUser = await userRepository.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).send(`The user with id: ${userId} is not found.`);
    }
    res.status(200).send(`User deleted successfully.`);
  } catch (err) {
    res
      .status(404)
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
