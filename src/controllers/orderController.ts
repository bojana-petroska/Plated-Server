import { Request, Response } from 'express';
import orderRepo from '../database/repositories/orderRepository.js';

const getAllOrders = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id) || -1;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const orders = await orderRepo.getAllOrdersFromUser(userId, page, limit);
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error fetching the menu items from the restaurant with id: ${userId}. ${err}`
      );
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderRepo.createOrderFromUser(req.body);
    console.log(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).send(`Order was not successfully created. Error: ${err}`);
  }
};

export default {
  getAllOrders,
  createOrder,
};
