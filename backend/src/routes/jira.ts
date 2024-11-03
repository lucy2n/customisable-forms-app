import { Router } from 'express';
import { createJiraTicketController, getUserTicketsController } from '../controllers/jira';

const router = Router();

router.post("/create-jira-ticket", createJiraTicketController);
router.get("/user-tickets", getUserTicketsController);

export default router;