import { Request, Response } from 'express';
import restaurantRepo from '../database/repositories/restaurantRepository.js';

const getAllRestaurants = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const restaurants = await restaurantRepo.getAllRestaurants(page, limit);
    console.log(restaurants);
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getRestaurant = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  try {
    const restaurant = await restaurantRepo.getRestaurant(restaurantId);
    res.status(200).json(restaurant);
  } catch (err) {
    res
      .status(404)
      .send(
        `The restaurant with id: ${restaurantId} is not found. Error: ${err}`
      );
  }
};

const getOwnRestaurant = async (
  req: Request & { payload?: any },
  res: Response
) => {
  const restaurant_id = req.payload?.restaurant_id;
  console.log('REST_ID:', restaurant_id)

  if (!restaurant_id) {
    res.status(400).send('Restaurant ID not found in request payload.');
    return;
  }

  try {
    const restaurant = await restaurantRepo.getRestaurant(restaurant_id);

    if (!restaurant) {
      res.status(404).send(`Restaurant with id ${restaurant_id} not found.`);
      return;
    }

    res.status(200).json(restaurant);
  } catch (err: unknown) {
    res.status(500).send(`Error retrieving restaurant: ${err}`);
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await restaurantRepo.createRestaurant(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res
      .status(400)
      .send(`Restaurant was not successfully created. Error: ${err}`);
  }
};

const updateRestaurant = async (
  req: Request & { payload?: any },
  res: Response
) => {
  const restaurant_id = req.payload?.restaurant_id;
  try {
    const updatedRestaurant = await restaurantRepo.updateRestaurant(
      restaurant_id,
      req.body
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res
      .status(404)
      .send(
        `The restaurant with id: ${restaurant_id} is not found. Error: ${err}`
      );
  }
};

const deleteRestaurant = async (
  req: Request & { payload?: any },
  res: Response
) => {
  const restaurant_id = req.payload?.restaurant_id;
  try {
    const deletedRestaurant = await restaurantRepo.deleteOneRestaurant(
      restaurant_id
    );
    if (!deletedRestaurant) {
      res
        .status(404)
        .send(`The restaurant with id: ${restaurant_id} is not found.`);
    }
    res.status(200).send(`Restaurant deleted successfully.`);
  } catch (err) {
    res
      .status(500)
      .send(
        `The restaurant with id: ${restaurant_id} is not found. Error: ${err}`
      );
  }
};

export default {
  getAllRestaurants,
  getRestaurant,
  getOwnRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
