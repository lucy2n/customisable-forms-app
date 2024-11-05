import { Request, Response } from 'express';
import { findOrCreateJiraUser, createTicket, getUserTickets } from '../services/jiraService';
import { CREATED } from '../utils/constants';

export const createJiraTicketController = async (req: Request, res: Response) => {
    const { summary, priority, pageLink, template, userEmail, displayName } = req.body;

    console.log(displayName);
    try {
        const accountId = await findOrCreateJiraUser(userEmail, displayName);
        console.log(accountId);

        const ticketData: any = await createTicket(summary, priority, pageLink, template, userEmail, accountId);
        const ticketUrl = `${process.env.JIRA_BASE_URL}/browse/${ticketData.key}`;

        res.status(CREATED).json({ ticketId: ticketData.key, ticketUrl });
    } catch (error) {
        console.error("Error creating Jira ticket:", error);
        res.status(500).json({ error: "Failed to create Jira ticket" });
    }
};

export const getUserTicketsController = async (req: Request, res: Response) => {
    const userEmail = req.query.email as string;

    try {
        const tickets = await getUserTickets(userEmail);
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching Jira tickets:", error);
        res.status(500).json({ error: "Failed to fetch Jira tickets" });
    }
};