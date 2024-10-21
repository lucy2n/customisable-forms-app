import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment';

const router = Router();

router.get('/add/:id', getComments);
router.post('/remove/:id', createComment);

export default router;