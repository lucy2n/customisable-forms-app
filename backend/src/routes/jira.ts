import { Router } from 'express';
import { getUserTicketsController } from '../controllers/jira';

const router = Router();

router.get("/user-tickets", getUserTicketsController);

export default router;