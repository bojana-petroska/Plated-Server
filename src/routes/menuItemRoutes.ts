import { Router } from 'express';
import menuItemsController from '../controllers/menuItemController.js';

const router = Router({ mergeParams: true });

router.get('/', menuItemsController.getAllMenuItems);
router.post('/', menuItemsController.createMenuItem);
router.get('/:menuItem_id', menuItemsController.getMenuItem);
router.put('/:menuItem_id', menuItemsController.updateMenuItem);
router.delete('/:menuItem_id', menuItemsController.deleteMenuItem);

export default router;