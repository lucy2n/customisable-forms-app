import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment';

const router = Router();

router.get('/add', getComments);
router.post('/remove', createComment);

export default router;