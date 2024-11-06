import { useEffect, useState } from "react";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";
import { ITemplate } from "../../entities/template/model/template";
import { getTemplatesByUser } from "../../shared/api/template";
import { useAppSelector } from "../../app/routes/lib/hook";
import ProfileTabs from "./profile-tabs/profile-tabs";
import AdminPage from "../admin-page/admin-page";
import { RootState } from "../../app/appStore";
import SalesforceForm from "../../features/salesforce-form/salesforce-form";
import { getTickets } from "../../shared/api/jira";
import { IJiraTicket } from "../../entities/jira-ticket/jira-ticket";
import TicketsList from "../../features/tickets-list/tickets-list";

const ProfilePage = () => {
    const user = useAppSelector((store: RootState) => store.user);
    const [templates, setTemplates] = useState<ITemplate[]>([]);
    const [tickets, setTickets] = useState<IJiraTicket[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('My templates');
    const [loadingTemplates, setLoadingTemplates] = useState<boolean>(true);
    const [loadingTickets, setLoadingTickets] = useState(true);

    const updateTab = (tab: string) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        if (user.email) {
            getTickets(user.email)
                .then(res => setTickets(res))
                .catch(err => console.error(err))
                .finally(() => setLoadingTickets(false));
        }
    }, [user.email]);

    useEffect(() => {
        refreshTemplates();
    }, [user.id]);

    const refreshTemplates = () => {
        setLoadingTemplates(true);
        getTemplatesByUser(user.id)
            .then(res => setTemplates(res))
            .catch(err => console.error(err))
            .finally(() => setLoadingTemplates(false));
    };

    return (
        <main className="flex flex-wrap items-center w-11/12 mr-auto ml-auto pt-20">
            <ProfileTabs updateTab={updateTab} isAdmin={user.is_admin}/>

            {selectedTab === 'My templates' && (
                <FormTemplateList
                    refresh={refreshTemplates}
                    templates={templates}
                    title="My templates"
                    loading={loadingTemplates}
                />
            )}

            {selectedTab === 'Admin' && user.is_admin && <AdminPage />}

            {selectedTab === 'Salesforce' && user && <SalesforceForm />}

            {selectedTab === 'Tickets' && (
                <TicketsList loading={loadingTickets} tickets={tickets} />
            )}
        </main>
    );
};

export default ProfilePage;