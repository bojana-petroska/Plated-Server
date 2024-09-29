import { Request, Response } from 'express';
import menuItemModule from '../data/menuItemData.js';

const getAllMenuItems = (req: Request, res: Response) => {
  res.status(200).json(menuItemModule.getMenuItems());
};

const getMenuItem = (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  if (menuItemId) {
    res.status(200).json(menuItemModule.getMenuItem(menuItemId));
  } else {
    res.status(404).send(`menu item not found.`);
  }
};

const createMenuItem = (req: Request, res: Response) => {
  const menuItem = menuItemModule.createMenuItem(req.body);
  res.status(200).json(menuItem);
};

const updateMenuItem = (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  const menuItem = menuItemModule.getMenuItem(menuItemId);
  if (!menuItem) {
    res.status(404).send(`menu item not found.`);
  }
  const updatedMenuItem = menuItemModule.updateMenuItem(menuItemId, req.body);
  res.status(200).json(updatedMenuItem);
};

const deleteMenuItem = (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  const deletedMenuItem = menuItemModule.deleteMenuItem(menuItemId);
  if (deletedMenuItem) {
    res.status(200).send(`menu item deleted successfully.`);
  } else {
    res.status(404).send(`menu item not found.`);
  }
};

const getAllMenuItemsByRestaurant = (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const menuItemsForRestaurant = menuItemModule.menuItems.filter(
    (m) => m.restaurantId === restaurantId
  );

  res.status(200).json(menuItemsForRestaurant);
};

export default {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsByRestaurant,
};
