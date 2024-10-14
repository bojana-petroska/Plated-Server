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
