import userController from '../controllers/userController.js';
import { Router } from 'express';
import validator from '../middlewares/validation.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', validator, userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
