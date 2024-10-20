import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment';

const router = Router();

router.get('/', getComments);
router.post('/create', createComment);

export default router;