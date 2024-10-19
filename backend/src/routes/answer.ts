import { Router } from 'express';
import { createAnswer, getAnswers } from '../controllers/answer';

const router = Router();

router.get('/', getAnswers);
router.post('/create', createAnswer);

export default router;