import { Router } from 'express';
import orderController from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';

const router = Router({ mergeParams: true });

router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOneOrder);
router.post('/', orderController.createOrder);
router.put('/:orderId/:orderItemId', auth, orderController.updateOrderFromUser);
router.delete('/:orderId/', auth, orderController.cancelOrderFromUser);

export default router;
