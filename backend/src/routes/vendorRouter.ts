import { Router } from 'express';
import { updateOrders } from '../handlers/vendorHandler.js';

const router = Router();

router.post('/update-orders', updateOrders);

export default router;