import { Router } from 'express';
import { createAnswers } from '../controllers/answer';

const router = Router();

router.post('/answers', createAnswers);

export default router;