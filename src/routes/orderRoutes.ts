import { Router } from 'express';
import orderController from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';

const router = Router({ mergeParams: true });

router.get('/', auth, orderController.getAllOrders);
router.post('/', auth, orderController.createOrder);

export default router;