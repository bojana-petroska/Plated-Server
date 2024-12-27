import { Request, Response } from 'express';
import menuItemRepo from '../database/repositories/menuItemRepository.js';

const getAllMenuItems = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id) || -1;
  console.log(restaurantId)
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const keyword = req.query.keyword as string || undefined;

  try {
    const menuItems = await menuItemRepo.getAllMenuItemsFromRestaurant(
      restaurantId,
      page,
      limit,
      keyword
    );
    res.status(200).json(menuItems.data);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error fetching the menu items from the restaurant with id: ${restaurantId}. ${err}`
      );
  }
};

const getMenuItem = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id) || -1;
  const menuItemId = parseInt(req.params.menuItem_id);

  try {
    const menuItem = await menuItemRepo.getSingleMenuItemFromRestaurant(
      restaurantId,
      menuItemId
    );
    res.status(200).json(menuItem);
  } catch (err) {
    res
      .status(404)
      .send(
        `The menu item with id: ${menuItemId} is not found. ${err}`
      );
  }
};

const createMenuItem = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id) || -1;

  try {
    const menuItems = req.body;
    const createdMenuItems = [];

    for (const menuItemData of menuItems) {
      const newMenuItem = await menuItemRepo.createMenuItemForARestaurant(
        restaurantId,
        menuItemData
      );
      createdMenuItems.push(newMenuItem);
    }
    res.status(201).json(createdMenuItems);
  } catch (err) {
    res
      .status(400)
      .send(`Menu item was not successfully created. ${err}`);
  }
};

const updateMenuItem = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id) || -1;
  const menuItemId = parseInt(req.params.menuItem_id);

  try {
    const updatedMenuItem = await menuItemRepo.updateMenuItemFromRestaurant(
      restaurantId,
      menuItemId,
      req.body
    );
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res
      .status(404)
      .send(`The menu item with id: ${menuItemId} is not found. ${err}`);
  }
};

const deleteMenuItem = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id) || -1;
  const menuItemId = parseInt(req.params.menuItem_id);
  
  try {
    const deletedMenuItem = await menuItemRepo.deleteOneMenuItemFromRestaurant(
      restaurantId,
      menuItemId
    );
    if (!deletedMenuItem) {
      res
        .status(404)
        .send(`The menu item with id: ${menuItemId} is not found.`);
    }
    res.status(200).send(`Menu item deleted successfully.`);
  } catch (err) {
    res
      .status(500)
      .send(`The menu item with id: ${menuItemId} is not found. ${err}`);
  }
};

export default {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
