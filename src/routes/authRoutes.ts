import { Router } from 'express';
import authUserController from '../controllers/authUserController.js';
import authRestaurantController from '../controllers/authRestaurantController.js';

const router = Router();

router.post('/signup', authUserController.signUp);
router.post('/signin', authUserController.signIn);
router.post('/refreshtoken', authUserController.handleRefreshTokenGeneration);

router.post('/restaurant/signup', authRestaurantController.signUp);
router.post('/restaurant/signin', authRestaurantController.signIn);
router.post(
  '/refreshtoken',
  authRestaurantController.handleRefreshTokenGeneration
);

export default router;
