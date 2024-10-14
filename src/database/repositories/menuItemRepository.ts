import { IMenuItem, MenuItemInput } from '../../types/menuItemTypes.js';
import { MenuItem } from '../entities/MenuItem.js';
import { AppDataSource } from '../ormconfig.js';

const menuItemRepository = AppDataSource.getRepository(MenuItem);

const getAllMenuItems = async (): Promise<IMenuItem[]> =>
  await menuItemRepository.find();

const getMenuItem = async (menuItem_id: number): Promise<IMenuItem> => {
  const menuItem = await menuItemRepository.findOneBy({ menuItem_id });
  if (!menuItem) {
    throw new Error(`User with id: ${menuItem_id} not found.`);
  }
  return menuItem;
};

const createMenuItem = async (
  menuItemData: MenuItemInput
): Promise<IMenuItem> => {
  const menuItem = {
    ...menuItemData,
  };
  const newMenuItem = await menuItemRepository.save(menuItem);
  return newMenuItem;
};

const updateMenuItem = async (
  menuItem_id: number,
  updatedMenuItemData: Partial<IMenuItem>
): Promise<IMenuItem> => {
  const menuItem = await menuItemRepository.findOneBy({ menuItem_id });
  if (!menuItem) {
    throw new Error(`Menu item with id: ${menuItem_id} not found.`);
  }
  menuItemRepository.merge(menuItem, updatedMenuItemData);
  await menuItemRepository.save(menuItem);
  return menuItem;
};

const deleteOneMenuItem = async (menuItem_id: number) => {
    const deletedMenuItem = await menuItemRepository.delete({ menuItem_id });
  if (deletedMenuItem.affected === 0) {
    throw new Error(`Menu item with id: ${menuItem_id} not found.`);
  }
  return { message: `Menu item with id: ${menuItem_id} successfully deleted.` };
  };

export default {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteOneMenuItem
};
