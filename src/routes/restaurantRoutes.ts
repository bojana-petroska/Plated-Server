import { Router } from 'express';
import restaurantController from '../controllers/restaurantController.js';
import menuItemRoutes from './menuItemRoutes.js';

const router = Router();

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

router.use('/:id/menu', menuItemRoutes);

export default router;
