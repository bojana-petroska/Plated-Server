import { DataSource } from 'typeorm';
import { User } from './entities/User.js';
import { Restaurant } from './entities/Restaurant.js';
import { MenuItem } from './entities/MenuItem.js';
import { Cart } from './entities/Cart.js';
import { Order } from './entities/Order.js';
import { OrderItem } from './entities/OrderItem.js';
import { Courier } from './entities/Courier.js';
import { Notification } from './entities/Notification.js';
import { Payment } from './entities/Payment.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1009',
  database: 'plated_food_app',
  synchronize: true,
  logging: true,
  entities: [User, Restaurant, MenuItem, Cart, Order, OrderItem, Courier, Notification, Payment],
});
