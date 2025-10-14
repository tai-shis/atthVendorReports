import { Router } from 'express';

import { createVendor, fetchVendors, fetchUsers } from '../handlers/adminHandler.js';

const router = Router();

router.post('/create-vendor', createVendor);
router.get('/fetch-vendors', fetchVendors);
router.get('/fetch-users', fetchUsers);


export default router;