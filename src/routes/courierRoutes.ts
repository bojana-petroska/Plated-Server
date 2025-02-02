import { Router } from 'express';
import courierController from '../controllers/courierController.js';

const router = Router();

router.get('/:id', courierController.getCourier);
router.post('/', courierController.createCourier);
router.post('/signin', courierController.findCourierByCredentials);
router.put('/:id', courierController.updateCourier);

export default router;
