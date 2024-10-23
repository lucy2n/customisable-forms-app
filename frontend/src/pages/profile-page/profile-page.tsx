import { useEffect, useState } from "react";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";
import { ITemplate } from "../../entities/template/model/template";
import { getTemplatesByUser } from "../../shared/api/template";
import { useAppSelector } from "../../app/routes/lib/hook";
import ProfileTabs from "./profile-tabs/profile-tabs";
import AdminPage from "../admin-page/admin-page";

const ProfilePage = () => {
    const user = useAppSelector(state => state.user);
    const [templates, setTemplates] = useState<ITemplate[]>();
    const [selectedTab, setSelectedTab] = useState<string>('My templates');

    const updateTab = (tab: string) => {
        setSelectedTab(tab);
    };


    useEffect(() => {
        refresh();
    }, [user.id]);

    const refresh = () => {
        getTemplatesByUser(user.id)
        .then(res => setTemplates(res))
        .catch(err => console.log(err));
    };

    return (
        <main className="flex flex-wrap items-center w-11/12 mr-auto ml-auto pt-24">
            <ProfileTabs updateTab={updateTab} isAdmin={user.is_admin}/>

            {selectedTab === 'My templates' && templates && (
                <FormTemplateList refresh={refresh} templates={templates} title="My templates" loading={false} />
            )}

            {selectedTab === 'Admin' && user.is_admin && (
                <AdminPage />
            )}
        </main>
    );
};

export default ProfilePage;