import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment';
import { getLikes, likeTemplate, unlikeTemplate } from '../controllers/like';

const router = Router();

router.post('/add/:id', likeTemplate);
router.delete('/remove/:id', unlikeTemplate);
router.get('/:id', getLikes);

export default router;