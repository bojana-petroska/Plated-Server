import { Request, Response } from 'express';
import orderRepo from '../database/repositories/userOrderRepository.js';
import { io } from '../server.js';
import { OrderInput } from 'src/types/types.js';

const getAllOrders = async (
  req: Request & { payload?: any },
  res: Response
) => {
  const user_id = req.payload?.user_id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const orders = await orderRepo.getAllOrdersFromUser(user_id, page, limit);
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error fetching the menu items from the restaurant with id: ${user_id}. ${err}`
      );
  }
};

const getOneOrder = async (req: Request & { payload?: any }, res: Response) => {
  const user_id = req.payload?.user_id;
  const orderId = parseInt(req.params.orderId) || -1;

  if (isNaN(user_id) || isNaN(orderId)) {
    res.status(400).send('Invalid userId or orderId.');
    return;
  }

  try {
    const order = await orderRepo.getOneOrderFromUser(user_id, orderId);
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error fetching the order with id: ${orderId} from the user with id: ${user_id}. ${err}`
      );
  }
};

const createOrder = async (req: Request & { payload?: any }, res: Response) => {
  try {
    const user_id = req.payload?.user_id;
    const { restaurant_id } = req.body;
    if (!user_id) {
      res.status(401).send('User is not authenticated.');
      return;
    }

    const orderInput: OrderInput = { ...req.body };
    const newOrder = await orderRepo.createOrderFromUser(orderInput, user_id);
    console.log('New Order:', newOrder);
    console.log('Restaurant ID:', restaurant_id);

    // Send a notification to the restaurant
    const restaurantId = newOrder.restaurant?.restaurant_id || restaurant_id;
    if (restaurantId) {
      io.to(restaurantId.toString()).emit('orderCreated', newOrder);
      console.log('ORDER CREATED');
    }

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).send(`Order was not successfully created. Error: ${err}`);
  }
};

const updateOrderFromUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id) || -1;
  const orderId = parseInt(req.params.orderId) || -1;
  const orderItemId = parseInt(req.params.orderItemId) || 1;
  const { operation } = req.body;

  if (isNaN(userId) || isNaN(orderId)) {
    res.status(400).send('Invalid userId or orderId.');
    return;
  }

  if (!operation || !['increase', 'decrease'].includes(operation)) {
    res
      .status(400)
      .send('Invalid or missing operation. Use "increase" or "decrease".');
    return;
  }

  try {
    const updatedOrder = await orderRepo.updateOrderFromUser(
      userId,
      orderId,
      orderItemId,
      operation
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error updating the order with id: ${orderId} from the user with id: ${userId}. ${err}`
      );
  }
};

const cancelOrderFromUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id) || -1;
  const orderId = parseInt(req.params.orderId) || -1;

  if (isNaN(userId) || isNaN(orderId)) {
    res.status(400).send('Invalid userId or orderId.');
    return;
  }

  try {
    const canceledOrder = await orderRepo.cancelOrderFromUser(userId, orderId);
    res.status(200).json(canceledOrder);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error canceling the order with id: ${orderId} from the user with id: ${userId}. ${err}`
      );
  }
};

export default {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrderFromUser,
  cancelOrderFromUser,
};
