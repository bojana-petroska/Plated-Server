import { Router } from 'express';
import userController from '../controllers/userController.js';
import orderRoutes from '../routes/orderRoutes.js'
import validator from '../middlewares/validation.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUser);
router.post('/', validator, userController.createUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

router.use('/:id/orders', orderRoutes);

export default router;
