import restaurantController from '../controllers/restaurantController.js';
import { Router } from 'express';

const router = Router();

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

export default router;
