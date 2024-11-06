import { IJiraTicket } from "../../entities/jira-ticket/jira-ticket";
import { getToken } from "./api";
import { base_url } from "./constants";


export const createJiraTicket = async (ticket: IJiraTicket) => {
    const res = await fetch(`${base_url}/jira/create-jira-ticket/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    });

    return res.json();
};

export const getTickets = async (userEmail: string) => {
    const token = getToken();

    const res = await fetch(`${base_url}/jira/user-tickets?email=${userEmail}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        credentials: 'include',
    });


    return res.json();
};