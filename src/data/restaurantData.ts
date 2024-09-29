import { IRestaurant, RestaurantInput } from '../types/restaurantTypes';

let restaurants: IRestaurant[] = [
  {
    id: 1,
    name: 'Pizza Palace',
    password: 'restaurant123',
    address: '123 Main St',
    phoneNumber: '1234567890',
    email: 'info@pizzapalace.com',
    openingHours: '10:00 AM - 10:00 PM',
    deliveryRadius: 5,
    role: 'restaurant',
    menu: [],
    isOpen: true,
  },
  {
    id: 2,
    name: 'Burger House',
    password: 'restaurant456',
    address: '456 Central Ave',
    phoneNumber: '0987654321',
    email: 'info@burgerhouse.com',
    openingHours: '11:00 AM - 11:00 PM',
    deliveryRadius: 10,
    role: 'restaurant',
    menu: [],
    isOpen: false,
  },
];

const getRestaurants = () => restaurants;

const getRestaurant = (id: number) => restaurants.find((r) => r.id === id);

const createRestaurant = (restaurantData: RestaurantInput) => {
  const newRestaurant = {
    id: Math.floor(Math.random() * 1000),
    ...restaurantData,
    menu: [],
  };
  restaurants.push(newRestaurant);
  return newRestaurant;
};

const updateRestaurant = (
  id: number,
  updatedRestaurantData: Partial<IRestaurant>
): IRestaurant | undefined => {
  const restaurantIndex = restaurants.findIndex((r) => r.id === id);
  if (restaurantIndex === -1) {
    return undefined;
  }
  return (restaurants[restaurantIndex] = {
    ...restaurants[restaurantIndex],
    ...updatedRestaurantData,
  });
};

const deleteRestaurant = (id: number) => {
  const restaurantIndex = restaurants.findIndex((r) => r.id === id);
  if (restaurantIndex >= 0) {
    const restaurant = restaurants[restaurantIndex];
    restaurants.splice(restaurantIndex, 1);
    return restaurant;
  }
  return null;
}

export default {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
