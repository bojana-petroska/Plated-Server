import { MenuItem } from '../database/entities/MenuItem.js';

export interface PaginatedResults<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface IRestaurant {
  id?: number;
  name: string;
  password: string;
  address: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
  deliveryRadius: number;
  role?: string;
  menu?: Array<MenuItem>;
  isOpen?: boolean;
}

export type RestaurantInput = Omit<IRestaurant, 'id' | 'menu'>;

export interface IMenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  availability: boolean;
  category?: string;
  restaurantId?: number;
}

export type MenuItemInput = Omit<IMenuItem, 'id'>;

export interface IUser {
  id?: number;
  userName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  orderHistory?: Array<string>;
  role?: string;
  createdAt?: Date;
}

export type UserInput = Pick<IUser, 'userName' | 'email' | 'password'>;

export enum OrderStatus {
  pending = 'pending',
  preparing = 'preparing',
  delivered = 'delivered',
  completed = 'completed',
  canceled = 'canceled',
}

export interface IOrder {
  id?: number;
  userId: number;
  restaurantId: number;
  menuItems: Array<{
    menuItemId: number;
    quantity: number;
  }>;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderInput = Omit<IOrder, 'id' | 'createdAt' | 'updatedAt'>;

export interface ICart {
  id?: number;
  userId: number;
  orderItems: Array<{
    orderId?: number;
    menuItemId: number;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt?: Date;
}

export type CartInput = Omit<ICart, 'id' | 'createdAt' | 'updatedAt'>;

export interface IOrderItem {
  id?: number;
  orderId: number;
  menuItemId: number;
  quantity: number
}
