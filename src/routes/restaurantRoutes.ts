import { Router } from 'express';
import restaurantController from '../controllers/restaurantController.js';
import menuItemRoutes from './menuItemRoutes.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = Router();

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', isAuthenticated, restaurantController.updateRestaurant);
router.delete('/:id', isAuthenticated, restaurantController.deleteRestaurant);

router.use('/:id/menu', menuItemRoutes);

export default router;
