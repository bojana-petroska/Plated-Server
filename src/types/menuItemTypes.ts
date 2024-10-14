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
  