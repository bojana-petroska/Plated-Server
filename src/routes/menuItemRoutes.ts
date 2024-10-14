import { Router } from "express";
import menuItemController from '../controllers/menuItemController.js'

const router = Router();

router.get('/', menuItemController.getAllMenuItems);
router.get('/:id', menuItemController.getMenuItem);
// router.get('/restaurants/:restaurantId', menuItemController.getAllMenuItemsByRestaurant); // access from restaurant
router.post('/', menuItemController.createMenuItem);
router.put('/:id', menuItemController.updateMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);

export default router;