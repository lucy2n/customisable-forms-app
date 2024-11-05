import { SummaryPriority } from "../../features/help-form/lib/constants";

export interface IJiraTicket {
    summary: string,
    priority: SummaryPriority,
    pageLink: string, 
    template?: string, 
    displayName: string,
    userEmail: string
}