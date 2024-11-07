import {
  IRestaurant,
  PaginatedResults,
  RestaurantInput,
} from '../../types/types.js';
import { Restaurant } from '../entities/Restaurant.js';
import { AppDataSource } from '../ormconfig.js';

const restaurantRepository = AppDataSource.getRepository(Restaurant);

const getAllRestaurants = async (
  page: number,
  limit: number
): Promise<PaginatedResults<IRestaurant>> => {
  const offset = (page - 1) * limit;

  const [restaurants, total] = await restaurantRepository.findAndCount({
    select: [
      'restaurant_id',
      'name',
      'address',
      'phoneNumber',
      'email',
      'openingHours',
      'deliveryRadius',
      'role',
      'isOpen',
    ],
    skip: offset,
    take: limit,
  });

  return {
    data: restaurants,
    totalItems: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

const getRestaurant = async (restaurant_id: number): Promise<IRestaurant> => {
  const restaurant = await restaurantRepository.findOneBy({ restaurant_id });
  if (!restaurant) {
    throw new Error(`User with id: ${restaurant_id} not found.`);
  }
  return restaurant;
};

const createRestaurant = async (
  restaurantData: RestaurantInput
): Promise<IRestaurant> => {
  const restaurant = {
    ...restaurantData,
    menu: [],
  };
  const newRestaurant = await restaurantRepository.save(restaurant);
  return newRestaurant;
};

const updateRestaurant = async (
  restaurant_id: number,
  updatedRestaurantData: Partial<IRestaurant>
): Promise<IRestaurant | undefined> => {
  const restaurant = await restaurantRepository.findOneBy({ restaurant_id });
  if (!restaurant) {
    throw new Error(`User with id: ${restaurant_id} not found.`);
  }
  restaurantRepository.merge(restaurant, updatedRestaurantData);
  await restaurantRepository.save(restaurant);
  return restaurant;
};

const deleteOneRestaurant = async (
  restaurant_id: number
): Promise<{ message: string }> => {
  const deletedRestaurant = await restaurantRepository.delete({
    restaurant_id,
  });
  if (deletedRestaurant.affected === 0) {
    throw new Error(`User with id: ${restaurant_id} not found.`);
  }
  return { message: `User with id: ${restaurant_id} successfully deleted.` };
};

export default {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteOneRestaurant,
};
