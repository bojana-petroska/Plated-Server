import { Router } from 'express';
import courierController from '../controllers/courierController.js';

const router = Router();

router.get('/', courierController.getCourier);
router.post('/', courierController.createCourier);
router.put('/:id', courierController.updateCourier);

export default router;
