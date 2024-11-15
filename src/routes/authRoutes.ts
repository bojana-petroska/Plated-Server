import { Router } from 'express';
import authController from '../controllers/authController.js';
// import auth from '../middlewares/auth.js';

const router = Router();

// router.get('/verify', auth, authController.verify);
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refreshtoken', authController.handleRefreshTokenGeneration);

export default router;
