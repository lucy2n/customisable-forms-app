import { Router } from 'express';
import { createComment } from '../controllers/comment';

const router = Router();

router.post('/create', createComment);

export default router;