import { Request, Response } from 'express';
import userModule from '../data/userData.js';

const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json(userModule.getUsers());
};

const getUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = userModule.getUser(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send(`the user with id: ${userId} is not found.`);
  }
};

const createUser = (req: Request, res: Response) => {
  const newUser = userModule.createUser(req.body);
  res.status(200).json(newUser);
};

const updateUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = userModule.getUser(userId);

  if (!user) {
    res.status(404).send(`user not found.`);
  }
  const updatedUser = userModule.updateUser(userId, req.body);
  res.status(200).json(updatedUser);
};

const deleteUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = userModule.deleteUser(userId);

  if (user) {
    res.status(200).send(`user deleted successfully.`);
  } else {
    res.status(404).send(`user not found.`);
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
