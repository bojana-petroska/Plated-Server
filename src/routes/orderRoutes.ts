import { Router } from 'express';
import orderController from '../controllers/userOrderController.js';
import { userAuth } from '../middlewares/auth.js';

const router = Router();

// User Order Routes
router.get('/', userAuth, orderController.getAllOrders);
router.get('/:orderId', userAuth, orderController.getOneOrder);
router.post('/', userAuth, orderController.createOrder);
router.put(
  '/:orderId/:orderItemId',
  userAuth,
  orderController.updateOrderFromUser
);
router.delete('/:orderId/', userAuth, orderController.cancelOrderFromUser);

// Restaurant Order Routes

export default router;
