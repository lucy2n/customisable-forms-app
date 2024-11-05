
import { IJiraTicket } from "../../entities/jira-ticket/jira-ticket";
import { getToken } from "./api";
import { base_url } from "./constants";


export const createJiraTicket = async (ticket: IJiraTicket) => {
    const token = getToken();

    const res = await fetch(`${base_url}/jira/create-jira-ticket/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ticket),
      credentials: 'include',
    });

    return res.json();
};