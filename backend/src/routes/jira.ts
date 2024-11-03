import { Router } from 'express';
import { createTicket, getUserTickets } from '../controllers/jira';

const router = Router();

router.post("/create-jira-ticket", createTicket);
router.get("/user-tickets", getUserTickets);

export default router;