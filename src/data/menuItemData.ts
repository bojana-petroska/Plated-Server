import { IMenuItem, MenuItemInput } from '../types/menuItemTypes.js';

let menuItems: IMenuItem[] = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce and mozzarella cheese.',
    price: 8,
    imageUrl:
      'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format',
    availability: true,
    category: 'Pizza',
    restaurantId: 1,
  },
  {
    id: 2,
    name: 'Cheeseburger',
    description: 'Juicy beef burger with cheese and lettuce.',
    price: 10,
    imageUrl: 'https://www.mexicantears.de/images/burger-lang.jpg',
    availability: true,
    category: 'Burger',
    restaurantId: 2,
  },
];

const getMenuItems = () => menuItems;

const getMenuItem = (id: number) => menuItems.find((m) => m.id === id);

const createMenuItem = (menuItemData: MenuItemInput) => {
  const newMenuItem = {
    id: Math.floor(Math.random() * 1000),
    ...menuItemData,
  };
  menuItems.push(newMenuItem);
  return newMenuItem;
};

const updateMenuItem = (
  id: number,
  updatedMenuItemData: Partial<IMenuItem>
): IMenuItem | undefined => {
  const menuItemIndex = menuItems.findIndex((m) => m.id === id);
  if (menuItemIndex === -1) {
    return undefined;
  }
  return (menuItems[menuItemIndex] = {
    ...menuItems[menuItemIndex],
    ...updatedMenuItemData,
  });
};

const deleteMenuItem = (id: number) => {
  const menuItemIndex = menuItems.findIndex((m) => m.id === id);
  if (menuItemIndex >= 0) {
    const menuItem = menuItems[menuItemIndex];
    menuItems.splice(menuItemIndex, 1);
    return menuItem;
  }
  return null;
};

export default {
  menuItems,
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
