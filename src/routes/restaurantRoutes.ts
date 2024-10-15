import restaurantController from '../controllers/restaurantController.js';
import menuItemsController from '../controllers/menuItemController.js';
import { Router } from 'express';

const router = Router();

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

router.get('/:id/menu', menuItemsController.getAllMenuItems);
router.post('/:id/menu', menuItemsController.createMenuItem);
router.get('/:id/menu/:menuItem_id', menuItemsController.getMenuItem);
router.put('/:id/menu/:menuItem_id', menuItemsController.updateMenuItem);
router.delete('/:id/menu/:menuItem_id', menuItemsController.deleteMenuItem);

export default router;
