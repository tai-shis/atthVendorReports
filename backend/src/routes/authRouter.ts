import { Router } from 'express';
import { 
  register
} from '../handlers/authHandler.js';

const router = Router();

router.post('/register', register)

export default router;