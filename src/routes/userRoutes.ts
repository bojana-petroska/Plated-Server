import { Router } from 'express';
import userController from '../controllers/userController.js';
import orderRoutes from '../routes/orderRoutes.js'
import validator from '../middlewares/validation.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', validator, userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.use('/:id/orders', orderRoutes);

export default router;
