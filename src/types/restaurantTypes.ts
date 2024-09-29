export interface IRestaurant {
  id: number;
  name: string;
  password: string;
  address: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
  deliveryRadius: number;
  role: string;
  menu: Array<number>;
  isOpen: boolean;
}

export type RestaurantInput = Omit<IRestaurant, 'id' | 'menu'>;
