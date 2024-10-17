import { Router } from 'express';
import { createAnswer } from '../controllers/answer';

const router = Router();

router.post('/answers', createAnswer);

export default router;