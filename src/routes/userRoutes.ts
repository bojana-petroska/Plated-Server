import { Router } from 'express';
import userController from '../controllers/userController.js';
import orderRoutes from './userOrderRoutes.js';
import validator from '../middlewares/validation.js';
// import auth from '../middlewares/auth.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/profile', isAuthenticated, userController.getUserProfileData);
router.get('/:id', isAuthenticated, userController.getUser);
router.post('/', validator, userController.createUser);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

export default router;
