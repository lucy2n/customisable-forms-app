import { Request, Response } from 'express';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const authHeader = `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString("base64")}`;
const jiraAuthHeaders = {
    Authorization: authHeader,
    'Content-Type': 'application/json'
  };

export const createTicket = async (req: Request, res: Response) => {
    const { summary, priority, pageLink, template, userEmail } = req.body;

    const issueData = {
        fields: {
            project: {
                key: process.env.JIRA_PROJECT_KEY
            },
            summary: summary,
            description: `Reported by: ${userEmail}\nPage link: ${pageLink}`,
            issuetype: {
                name: "Task"
            },
            priority: {
                name: priority
            },
            customfield_template: template || "General",
            customfield_link: pageLink
        }
    };

    try {
        const response = await fetch(`${process.env.JIRA_BASE_URL}/rest/api/3/issue`, {
            method: "POST",
            headers: jiraAuthHeaders,
            body: JSON.stringify(issueData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create ticket: ${errorText}`);
        }

        const data: any = await response.json();
        res.status(200).json({ ticketId: data.key, ticketUrl: `${process.env.JIRA_BASE_URL}/browse/${data.key}` });
    } catch (error) {
        console.error("Error creating Jira ticket:", error);
        res.status(500).json({ error: "Failed to create Jira ticket" });
    }
}

export const getUserTickets = async (req: Request, res: Response) => {
    const userEmail = req.query.email;
    const jqlQuery = `reporter = "${userEmail}" ORDER BY created DESC`;

    try {
        const response = await fetch(
            `${process.env.JIRA_BASE_URL}/rest/api/3/search?jql=${encodeURIComponent(jqlQuery)}`, {
            headers: jiraAuthHeaders
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch tickets: ${errorText}`);
        }

        const data: any = await response.json();
        res.status(200).json(data.issues);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: "Failed to fetch tickets" });
    }
}