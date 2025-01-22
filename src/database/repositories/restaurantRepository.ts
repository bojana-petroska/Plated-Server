import {
  IRestaurant,
  PaginatedResults,
  RestaurantInput,
} from '../../types/types.js';
import { Restaurant } from '../entities/Restaurant.js';
import { AppDataSource } from '../../config/ormconfig.js';
import bcrypt from 'bcrypt';

const restaurantRepository = AppDataSource.getRepository(Restaurant);

const getAllRestaurants = async (
  page: number,
  limit: number
): Promise<PaginatedResults<IRestaurant>> => {
  const offset = (page - 1) * limit;

  const [restaurants, total] = await restaurantRepository.findAndCount({
    // select: [
    //   'restaurant_id',
    //   'name',
    //   'address',
    //   'phoneNumber',
    //   'email',
    //   'imageUrl',
    //   'openingHours',
    //   'deliveryRadius',
    //   'isOpen',
    // ],
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

const getOwnRestaurant = async (
  restaurant_id: number
): Promise<IRestaurant | null> => {
  return await restaurantRepository.findOneBy({ restaurant_id: restaurant_id });
};

const createRestaurant = async ({
  name,
  password,
}: RestaurantInput): Promise<IRestaurant> => {
  const existingRestaurant = await restaurantRepository.findOne({
    where: [{ name }],
  });

  if (existingRestaurant) {
    throw new Error('Restaurant already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed password!:', hashedPassword);

  const newRestaurant = restaurantRepository.create({
    name,
    password: hashedPassword,
    token: '',
    refreshToken: '',
    address: '',
    phoneNumber: '',
    email: '',
    openingHours: '',
    deliveryRadius: 0,
    menu: [],
    isOpen: false,
  });

  console.log(newRestaurant);
  return await restaurantRepository.save(newRestaurant);
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
  getOwnRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteOneRestaurant,
};
