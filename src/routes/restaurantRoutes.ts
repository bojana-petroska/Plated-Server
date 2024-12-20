import { Router } from 'express';
import restaurantController from '../controllers/restaurantController.js';
import menuItemRoutes from './menuItemRoutes.js';
import { restaurantAuth } from '../middlewares/auth.js';
import { userAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', userAuth, restaurantController.getAllRestaurants);
router.get('/:id', userAuth, restaurantController.getRestaurant);
router.post('/', restaurantAuth, restaurantController.createRestaurant);
router.put('/:id', restaurantAuth, restaurantController.updateRestaurant);
router.delete('/:id', restaurantAuth, restaurantController.deleteRestaurant);

router.use('/:id/menu', menuItemRoutes);

export default router;
