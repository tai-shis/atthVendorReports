import { Router } from 'express';
import { updateOrders, fetchOrders } from '../handlers/vendorHandler.js';

const router = Router();

router.post('/update-orders', updateOrders);
router.post('/fetch-orders', fetchOrders);

export default router;