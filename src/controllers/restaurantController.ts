import { Request, Response } from 'express';
import restaurantModule from '../data/restaurantData.js';

const getAllRestaurants = (req: Request, res: Response) => {
  res.status(200).json(restaurantModule.getRestaurants());
};

const getRestaurant = (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  const restaurant = restaurantModule.getRestaurant(restaurantId);
  if (restaurant) {
    res.status(200).json(restaurant);
  } else {
    res.status(404).send(`restaurant not found.`);
  }
};

const createRestaurant = (req: Request, res: Response) => {
  const restaurant = restaurantModule.createRestaurant(req.body);
  res.status(200).json(restaurant);
};

const updateRestaurant = (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  const restaurant = restaurantModule.getRestaurant(restaurantId);
  if (!restaurant) {
    res.status(400).send(`restaurant not found.`);
  }
  const updatedRestaurant = restaurantModule.updateRestaurant(
    restaurantId,
    req.body
  );
  res.status(200).json(updatedRestaurant);
};

const deleteRestaurant = (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  const deletedRestaurant = restaurantModule.deleteRestaurant(restaurantId);

  if (deletedRestaurant) {
    res.status(200).send(`restaurant deleted successfully.`);
  } else {
    res.status(404).send(`restaurant not found.`)
  }
}

export default {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
