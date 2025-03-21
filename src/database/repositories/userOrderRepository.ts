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
import { AppDataSource } from '../../config/ormconfig.js';

const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);
const restaurantRepository = AppDataSource.getRepository(Restaurant);
const menuItemRepository = AppDataSource.getRepository(MenuItem);
const orderItemRepository = AppDataSource.getRepository(OrderItem);

const getAllOrdersFromUser = async (
  user_id: number,
  page: number,
  limit: number
): Promise<PaginatedResults<IOrder>> => {
  const user = await userRepository.findOneBy({ user_id });
  if (!user) throw new Error('User not found.');

  const offset = (page - 1) * limit;

  const [orders, total] = await orderRepository.findAndCount({
    where: { user: { user_id } },
    skip: offset,
    take: limit,
    relations: ['restaurant', 'orderItems', 'orderItems.menuItem'],
  });

  return {
    data: orders.map((order) => ({
      order_id: order.order_id,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderItems: order.orderItems,
      restaurant: {
        restaurant_id: order.restaurant.restaurant_id,
        name: order.restaurant.name,
        imageUrl: order.restaurant.imageUrl,
      },
    })),
    totalItems: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

const getOneOrderFromUser = async (user_id: number, order_id: number) => {
  const order = await orderRepository.findOne({
    where: {
      user: { user_id },
      order_id: order_id,
    },
    relations: ['restaurant', 'orderItems', 'orderItems.menuItem'],
  });

  if (!order) {
    throw new Error('Order not found or does not belong to this user.');
  }

  return order;
};

const createOrderFromUser = async (
  orderInput: OrderInput,
  user_id: number
): Promise<IOrder> => {
  const { restaurant_id, orderItems } = orderInput;

  const user = await userRepository.findOneBy({ user_id });
  const restaurant = await restaurantRepository.findOneBy({
    restaurant_id: restaurant_id,
  });

  if (!user || !restaurant) throw new Error(`User or restaurant not found.`);

  let totalPrice = 0;

  const orderItemsEntities = await Promise.all(
    orderItems.map(async (item) => {
      const menuItem = await menuItemRepository.findOneBy({
        menuItem_id: item.menuItem.menuItem_id,
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
  newOrder.restaurant = restaurant;
  newOrder.totalPrice = totalPrice;
  newOrder.orderItems = orderItemsEntities;

  await orderRepository.save(newOrder);

  const transformedOrderItems: Omit<IOrderItem, 'order'>[] =
    orderItemsEntities.map((item) => ({
      orderItem_id: item.orderItem_id,
      menuItem: item.menuItem,
      quantity: item.quantity,
    }));

  return {
    user: newOrder.user,
    order_id: newOrder.order_id,
    totalPrice: newOrder.totalPrice,
    status: newOrder.status,
    createdAt: newOrder.createdAt,
    updatedAt: newOrder.updatedAt,
    orderItems: transformedOrderItems,
  };
};

const updateOrderFromUser = async (
  user_id: number,
  order_id: number,
  orderItem_id: number,
  operation: string
) => {
  const order = await getOneOrderFromUser(user_id, order_id);
  if (!order) {
    throw new Error('Order not found or does not belong to this user.');
  }

  const targetItem = order.orderItems.find(
    (item) => item.orderItem_id === orderItem_id
  );
  if (!targetItem) {
    throw new Error('Order item not found in this order.');
  }

  if (operation === 'increase') {
    targetItem.quantity += 1;
  } else if (operation === 'decrease') {
    targetItem.quantity -= 1;
    if (targetItem.quantity < 1) {
      order.orderItems = order.orderItems.filter(
        (item) => item.orderItem_id !== orderItem_id
      );
    }
  } else {
    throw new Error('Invalid operation. Use "increase" or "decrease".');
  }

  let newTotalPrice = 0;

  order.orderItems.forEach((item) => {
    newTotalPrice += item.quantity * item.menuItem.price;
  });

  order.totalPrice = Math.round(newTotalPrice) / 100;

  await orderRepository.save(order);

  return {
    id: order.order_id,
    userId: order.user.user_id,
    restaurantId: order.restaurant.restaurant_id,
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: new Date(),
    orderItems: order.orderItems
      .filter((item) => item.orderItem_id === orderItem_id)
      .map((item) => ({
        orderItemId: item.orderItem_id,
        menuItemName: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price,
      })),
  };
};

const cancelOrderFromUser = async (user_id: number, order_id: number) => {
  const order = await getOneOrderFromUser(user_id, order_id);
  if (!order) {
    throw new Error('Order not found or does not belong to this user.');
  }

  if (order.status !== 'pending') {
    throw new Error('Only pending orders can be cancelled.');
  }
  await orderItemRepository.remove(order.orderItems);
  await orderRepository.remove(order);

  return { message: 'Order canceled successfully' };
};

export default {
  getAllOrdersFromUser,
  getOneOrderFromUser,
  createOrderFromUser,
  updateOrderFromUser,
  cancelOrderFromUser,
};
