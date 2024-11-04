import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_ADMIN_BASE_URL = `https://lysianaumenko2002.atlassian.net`;
const JIRA_CLOUD_ID = process.env.JIRA_CLOUD_ID;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const authHeader = `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString("base64")}`;
const jiraAuthHeaders = {
    Authorization: authHeader,
    'Content-Type': 'application/json'
};

const findUserByEmail = async (email: string) => {
    const response = await fetch(
        `${JIRA_BASE_URL}/rest/api/3/user/search?query=${email}`,
        {
            method: 'GET',
            headers: {
                Authorization: authHeader,
                'Accept': 'application/json',
            },
        }
    );

    // Check if the response is OK and parse the JSON
    if (response.ok) {
        const users: any = await response.json();
        // Return the first user found or null if no users were found
        return users.length > 0 ? users[0] : null;
    } else {
        throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
    }
};

// Helper to find or create a Jira user
export const findOrCreateJiraUser = async (email: string, displayName: string) => {
    try {
        const user = await findUserByEmail(email);

        if (user) {
            return user.accountId;
        } else {
            const newUser: any = await createJiraUser(email, displayName);
            return newUser.accountId;
        }
    } catch (error) {
        console.error("Error finding or creating Jira user:", error);
        throw error;
    }
};

// Helper to create a new Jira user
const createJiraUser = async (email: string, displayName: string) => {
    try {
        const response = await fetch(
            `${JIRA_BASE_URL}/rest/api/3/user`,
            {
                method: 'POST',
                headers: jiraAuthHeaders,
                body: JSON.stringify({ "emailAddress": email })
            }
        );
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to create Jira user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating Jira user:", error);
        throw error;
    }
};

// Helper to create a Jira ticket
export const createTicket = async (summary: string, priority: string, pageLink: string, template: string, userEmail: string, accountId: string) => {
    const adfDescription = {
        version: 1,
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [
                    {
                        text: `Reported by: ${userEmail}\nPage link: ${pageLink}`,
                        type: "text"
                    }
                ]
            }
        ]
    };

    const issueData = {
        fields: {
            project: { key: JIRA_PROJECT_KEY },
            summary,
            description: adfDescription,
            issuetype: { name: "Task" },
            priority: { name: priority },
            customfield_10037: template || "General",
            customfield_10038: pageLink,
            reporter: accountId
        }
    };

    try {
        const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue`, {
            method: "POST",
            headers: jiraAuthHeaders,
            body: JSON.stringify(issueData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to create ticket: ${errorText}`);
            throw new Error(`Failed to create ticket: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating Jira ticket:", error);
        throw error;
    }
};

// Helper to fetch Jira tickets for a specific user
export const getUserTickets = async (userEmail: string) => {
    const jqlQuery = `reporter = "${userEmail}" ORDER BY created DESC`;

    try {
        const response = await fetch(
            `${JIRA_BASE_URL}/rest/api/3/search?jql=${encodeURIComponent(jqlQuery)}`,
            { headers: jiraAuthHeaders }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch tickets: ${errorText}`);
        }

        const data: any = await response.json();
        return data.issues;
    } catch (error) {
        console.error("Error fetching Jira tickets:", error);
        throw error;
    }
};