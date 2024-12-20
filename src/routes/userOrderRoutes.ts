import { Router } from 'express';
import orderController from '../controllers/userOrderController.js';
import { userAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOneOrder);
router.post('/', orderController.createOrder);
router.put(
  '/:orderId/:orderItemId',
  userAuth,
  orderController.updateOrderFromUser
);
router.delete('/:orderId/', userAuth, orderController.cancelOrderFromUser);

export default router;
