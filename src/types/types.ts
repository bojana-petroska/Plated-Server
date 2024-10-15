import { MenuItem } from "../database/entities/MenuItem.js";

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

export interface PaginatedResults<T> {
  data: T[],
  totalItems: number;    
  currentPage: number;   
  totalPages: number;  
}

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

