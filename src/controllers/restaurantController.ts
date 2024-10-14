import { Request, Response } from 'express';
import restaurantRepo from '../database/repositories/restaurantRepository.js';

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantRepo.getAllRestaurants();
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
      .send(`The restaurant with id: ${restaurantId} is not found. Error: ${err}`);
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await restaurantRepo.createRestaurant(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).send(`Restaurant was not successfully created. Error: ${err}`);
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  try {
    const updatedRestaurant = await restaurantRepo.updateRestaurant(restaurantId, req.body);
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res
      .status(404)
      .send(`The restaurant with id: ${restaurantId} is not found. Error: ${err}`);
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  try {
    const deletedRestaurant = await restaurantRepo.deleteOneRestaurant(restaurantId);
    if (!deletedRestaurant) {
      res.status(404).send(`The restaurant with id: ${restaurantId} is not found.`);
    }
    res.status(200).send(`Restaurant deleted successfully.`);
  } catch (err) {
    res
      .status(500)
      .send(`The restaurant with id: ${restaurantId} is not found. Error: ${err}`);
  }
}

export default {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
