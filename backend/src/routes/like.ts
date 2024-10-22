import { Router } from 'express';
import { likeTemplate, unlikeTemplate } from '../controllers/like';

const router = Router();

router.post('/add/:id', likeTemplate);
router.delete('/remove/:id', unlikeTemplate);

export default router;