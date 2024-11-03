// import { Request, Response } from 'express';
// import fetch from 'node-fetch';

// const JIRA_BASE_URL = "https://lysianaumenko2002.atlassian.net"
// const JIRA_PROJECT_KEY = "KAN"
// const JIRA_EMAIL = "lysia.naumenko2002@gmail.com"

// // Basic Auth Header
// const authHeader = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`;

// export class JiraController {
//     static async createTicket(req: Request, res: Response) {
//         const { summary, priority, pageLink, template, userEmail } = req.body;

//         const issueData = {
//             fields: {
//                 project: {
//                     key: JIRA_PROJECT_KEY
//                 },
//                 summary: summary,
//                 description: `Reported by: ${userEmail}\nPage link: ${pageLink}`,
//                 issuetype: {
//                     name: "Task"
//                 },
//                 priority: {
//                     name: priority
//                 },
//                 customfield_template: template || "General", // Adjust custom field key if necessary
//                 customfield_link: pageLink // Adjust custom field key if necessary
//             }
//         };

//         try {
//             const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue`, {
//                 method: "POST",
//                 headers: {
//                     "Authorization": authHeader,
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(issueData)
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to create ticket: ${errorText}`);
//             }

//             const data = await response.json();
//             res.status(200).json({ ticketId: data.key, ticketUrl: `${JIRA_BASE_URL}/browse/${data.key}` });
//         } catch (error) {
//             console.error("Error creating Jira ticket:", error);
//             res.status(500).json({ error: "Failed to create Jira ticket" });
//         }
//     }

//     // Method to fetch tickets created by a specific user
//     static async getUserTickets(req: Request, res: Response) {
//         const userEmail = req.query.email;
//         const jqlQuery = `reporter = "${userEmail}" ORDER BY created DESC`;

//         try {
//             const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/search?jql=${encodeURIComponent(jqlQuery)}`, {
//                 headers: {
//                     "Authorization": authHeader,
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to fetch tickets: ${errorText}`);
//             }

//             const data = await response.json();
//             res.status(200).json(data.issues);
//         } catch (error) {
//             console.error("Error fetching tickets:", error);
//             res.status(500).json({ error: "Failed to fetch tickets" });
//         }
//     }
// }