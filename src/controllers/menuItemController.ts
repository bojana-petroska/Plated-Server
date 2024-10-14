import { Request, Response } from 'express';
import menuItemRepo from '../database/repositories/menuItemRepository.js';

const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await menuItemRepo.getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getMenuItem = async (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  try {
    const menuItem = await menuItemRepo.getMenuItem(menuItemId);
    res.status(200).json(menuItem);
  } catch (err) {
    res
      .status(404)
      .send(`The restaurant with id: ${menuItemId} is not found. Error: ${err}`);
  }
};

const createMenuItem = async (req: Request, res: Response) => {
  try {
    const newMenuItem = await menuItemRepo.createMenuItem(req.body);
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).send(`Menu item was not successfully created. Error: ${err}`);
  }
};

const updateMenuItem = async (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  try {
    const updatedMenuItem = await menuItemRepo.updateMenuItem(menuItemId, req.body);
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res
      .status(404)
      .send(`The menu item with id: ${menuItemId} is not found. Error: ${err}`);
  }
};

const deleteMenuItem = async (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  try {
    const deletedMenuItem = await menuItemRepo.deleteOneMenuItem(menuItemId);
    if (!deletedMenuItem) {
      res.status(404).send(`The menu item with id: ${menuItemId} is not found.`);
    }
    res.status(200).send(`Menu item deleted successfully.`);
  } catch (err) {
    res
      .status(500)
      .send(`The menu item with id: ${menuItemId} is not found. Error: ${err}`);
  }
};

// const getAllMenuItemsByRestaurant = (req: Request, res: Response) => {
//   const restaurantId = parseInt(req.params.restaurantId);
//   const menuItemsForRestaurant = menuItemModule.menuItems.filter(
//     (m) => m.restaurantId === restaurantId
//   );

//   res.status(200).json(menuItemsForRestaurant);
// };

export default {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
