import { Router } from 'express';
import authController from '../controllers/authController.js';
import authRestaurantController from '../controllers/authRestaurantController.js';
// import auth from '../middlewares/auth.js';

const router = Router();

// router.get('/verify', auth, authController.verify);

// User auth routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refreshtoken', authController.handleRefreshTokenGeneration);

// Restaurant auth routes
router.post('/restaurant/signup', authRestaurantController.signUp);
router.post('/restaurant/signin', authRestaurantController.signIn);
router.post(
  '/refreshtoken',
  authRestaurantController.handleRefreshTokenGeneration
);

export default router;
