import { Router } from 'express';
import userController from '../controllers/userController.js';
import { validateRequest } from '../middlewares/validateRequest.js'
import { userValidationSchema } from '../middlewares/userValidationSchema.js'
import { userAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/profile', userAuth, userController.getUserProfileData);
router.get('/upload/:id', userAuth, userController.getUploadURL);
router.get('/:id', userAuth, userController.getUser);
router.post('/', validateRequest(userValidationSchema), userAuth, userController.createUser);
router.put('/:id', userAuth, userController.updateUser);
router.delete('/:id', userAuth, userController.deleteUser);

export default router;
