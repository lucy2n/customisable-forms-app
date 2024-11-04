import { Request, Response } from 'express';
import { findOrCreateJiraUser, createTicket, getUserTickets } from '../services/jiraService';

// Controller to create a new Jira ticket
export const createJiraTicketController = async (req: Request, res: Response) => {
    const { summary, priority, pageLink, template, userEmail } = req.body;

    try {
        // Ensure reporter user exists in Jira
        const user: any = await findOrCreateJiraUser(userEmail, req.body.displayName);
        console.log(user);

        // Create the Jira ticket
        const ticketData: any = await createTicket(summary, priority, pageLink, template, userEmail, user.accountId);
        const ticketUrl = `${process.env.JIRA_BASE_URL}/browse/${ticketData.key}`;

        res.status(200).json({ ticketId: ticketData.key, ticketUrl });
    } catch (error) {
        console.error("Error creating Jira ticket:", error);
        res.status(500).json({ error: "Failed to create Jira ticket" });
    }
};

// Controller to get tickets for a specific user
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