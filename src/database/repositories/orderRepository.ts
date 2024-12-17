import {
  IOrder,
  IOrderItem,
  OrderInput,
  PaginatedResults,
} from '../../types/types.js';
import { MenuItem } from '../entities/MenuItem.js';
import { Order } from '../entities/Order.js';
import { OrderItem } from '../entities/OrderItem.js';
import { Restaurant } from '../entities/Restaurant.js';
import { User } from '../entities/User.js';
import { AppDataSource } from '../ormconfig.js';

const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);
const restaurantRepository = AppDataSource.getRepository(Restaurant);
const menuItemRepository = AppDataSource.getRepository(MenuItem);

const getAllOrdersFromUser = async (
  user_id: number,
  page: number,
  limit: number
): Promise<PaginatedResults<IOrder>> => {
  const user = await userRepository.findOneBy({ user_id: user_id });
  if (!user) throw new Error('User not found.');

  const offset = (page - 1) * limit;

  const [orders, total] = await orderRepository.findAndCount({
    where: { userId: user_id },
    skip: offset,
    take: limit,
  });

  return {
    data: orders,
    totalItems: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

const getOneOrderFromUser = async (user_id: number, order_id: number) => {
  // const user = await userRepository.findOneBy({ user_id: user_id });
  // if (!user) throw new Error('User not found.');
  const order = await orderRepository.findOne({
    where: {
      userId: user_id,
      order_id: order_id,
    },
  });
  console.log('Query Parameters:', { user_id, order_id });
  console.log('One Single Order:', order);

  return order;
};

const createOrderFromUser = async (orderInput: OrderInput): Promise<IOrder> => {
  const { userId, restaurantId, orderItems } = orderInput;

  const user = await userRepository.findOneBy({ user_id: userId });
  const restaurant = await restaurantRepository.findOneBy({
    restaurant_id: restaurantId,
  });

  if (!user || !restaurant) throw new Error(`User or restaurant not found.`);

  let totalPrice = 0;

  const orderItemsEntities = await Promise.all(
    orderItems.map(async (item) => {
      const menuItem = await menuItemRepository.findOneBy({
        menuItem_id: item.menuItem.id,
      });

      if (!menuItem)
        throw new Error(`Menu item with id: ${item.menuItem} not found.`);

      const orderItem = new OrderItem();
      orderItem.menuItem = menuItem;
      orderItem.quantity = item.quantity;

      totalPrice += menuItem.price * item.quantity;

      return orderItem;
    })
  );

  const newOrder = new Order();
  newOrder.user = user;
  newOrder.userId = userId;
  newOrder.restaurant = restaurant;
  newOrder.restaurantId = restaurantId;
  newOrder.totalPrice = totalPrice;
  newOrder.orderItems = orderItemsEntities;

  await orderRepository.save(newOrder);

  const transformedOrderItems: IOrderItem[] = orderItemsEntities.map(
    (item) => ({
      id: item.orderItem_id,
      order: newOrder,
      menuItem: item.menuItem,
      quantity: item.quantity,
    })
  );

  return {
    id: newOrder.order_id,
    userId: newOrder.userId,
    restaurantId: newOrder.restaurantId,
    totalPrice: newOrder.totalPrice,
    status: newOrder.status,
    createdAt: newOrder.createdAt,
    updatedAt: newOrder.updatedAt,
    orderItems: transformedOrderItems,
  };
};

const updateOrderFromUser = () => {};

const cancelOrderFromUser = () => {};

// Restaurant endpoints
const getAllOrdersFromRestaurant = () => {};

const getOneOrderFromRestaurant = () => {};

const updateOrderStatusFromRestaurant = () => {};

const cancelOrderFromRestaurant = () => {};

export default {
  getAllOrdersFromUser,
  getOneOrderFromUser,
  createOrderFromUser,
  updateOrderFromUser,
  cancelOrderFromUser,
  getAllOrdersFromRestaurant,
  getOneOrderFromRestaurant,
  updateOrderStatusFromRestaurant,
  cancelOrderFromRestaurant,
};
