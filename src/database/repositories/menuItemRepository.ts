import { IMenuItem, MenuItemInput } from '../../types/types.js';
import { PaginatedResults } from '../../types/types.js';
import { MenuItem } from '../entities/MenuItem.js';
import { AppDataSource } from '../ormconfig.js';
import { Like } from 'typeorm';

const menuItemRepository = AppDataSource.getRepository(MenuItem);

const getAllMenuItemsFromRestaurant = async (
  restaurant_id: number,
  page: number,
  limit: number,
  keyword?: string
): Promise<PaginatedResults<IMenuItem>> => {
  const offset = (page - 1) * limit;

  const findMenuItemFromRestaurant: any = {
    restaurant: { restaurant_id },
  };

  if (keyword) {
    findMenuItemFromRestaurant.name = Like(`%${keyword}%`)
  }

  const [menuItems, total] = await menuItemRepository.findAndCount({
    where: findMenuItemFromRestaurant,
    skip: offset,
    take: limit,
  });

  return {
    data: menuItems,
    totalItems: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

const getSingleMenuItemFromRestaurant = async (
  restaurantId: number,
  menuItemId: number
): Promise<IMenuItem> => {
  const menuItem = await menuItemRepository.findOne({
    where: {
      menuItem_id: menuItemId,
      restaurant: { restaurant_id: restaurantId },
    },
  });
  if (!menuItem) {
    throw new Error(`User with id: ${menuItemId} not found.`);
  }
  return menuItem;
};

const createMenuItemForARestaurant = async (
  restaurantId: number,
  menuItemData: MenuItemInput
): Promise<IMenuItem> => {
  const menuItem = {
    ...menuItemData,
    restaurant: { restaurant_id: restaurantId },
  };

  console.log('Menu Item Data:', menuItem);

  const newMenuItem = await menuItemRepository.save(menuItem);
  return newMenuItem;
};

const updateMenuItemFromRestaurant = async (
  restaurantId: number,
  menuItemId: number,
  updatedMenuItemData: Partial<IMenuItem>
): Promise<MenuItem> => {
  const menuItem = await menuItemRepository.findOne({
    where: {
      menuItem_id: menuItemId,
      restaurant: { restaurant_id: restaurantId },
    },
  });
  if (!menuItem) {
    throw new Error(`Menu item with id: ${menuItemId} not found.`);
  }
  menuItemRepository.merge(menuItem, updatedMenuItemData);
  return await menuItemRepository.save(menuItem);
};

const deleteOneMenuItemFromRestaurant = async (
  restaurantId: number,
  menuItemId: number
) => {
  const deletedMenuItem = await menuItemRepository.delete({
    menuItem_id: menuItemId,
    restaurant: { restaurant_id: restaurantId },
  });
  if (deletedMenuItem.affected === 0) {
    throw new Error(`Menu item with id: ${menuItemId} not found.`);
  }
  return { message: `Menu item with id: ${menuItemId} successfully deleted.` };
};

export default {
  getAllMenuItemsFromRestaurant,
  getSingleMenuItemFromRestaurant,
  createMenuItemForARestaurant,
  updateMenuItemFromRestaurant,
  deleteOneMenuItemFromRestaurant,
};
