import { Request, Response } from 'express';
import orderRepo from '../database/repositories/orderRepository.js';

const createOrder = async (req: Request, res: Response) => {
    try {
      const newOrder = await orderRepo.createOrderFromUser(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).send(`Order was not successfully created. Error: ${err}`);
    }
  };

  export default {
    createOrder,
  }