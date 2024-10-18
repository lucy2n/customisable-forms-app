import { useEffect, useState } from "react";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";
import { ITemplate } from "../../entities/template/model/template";
import { getTemplatesByUser } from "../../shared/api/template";
import { useAppDispatch, useAppSelector } from "../../app/routes/lib/hook";
import { useNavigate } from "react-router-dom";
import { logout } from "../../shared/api/user";
import { resetUser } from "../../entities/user/model/userSlice";
import { RoutePathname } from "../../app/routes/constants";
import ProfileTabs from "./profile-tabs/profile-tabs";
import AdminPage from "../admin-page/admin-page";

const ProfilePage = () => {
    const user = useAppSelector(state => state.user);
    const [templates, setTemplates] = useState<ITemplate[]>();
    const [selectedTab, setSelectedTab] = useState<string>('My templates');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const updateTab = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleLogout = () => {
        logout();
        dispatch(resetUser());
        navigate(RoutePathname.loginPage);
  };

    useEffect(() => {
        getTemplatesByUser(user.id)
        .then(res => setTemplates(res))
        .catch(err => console.log(err));
    }, [user.id]);

    useEffect(() => {
        if(selectedTab === 'Logout') {
            handleLogout()
        }
    }, [selectedTab])

    return (
        <main className="flex flex-wrap items-center w-11/12 mr-auto ml-auto pt-24">
            <ProfileTabs updateTab={updateTab} isAdmin={user.is_admin}/>

            {selectedTab === 'My templates' && templates && (
                <FormTemplateList templates={templates} title="My templates" />
            )}

            {selectedTab === 'Admin' && user.is_admin && (
                <AdminPage />
            )}
        </main>
    );
};

export default ProfilePage;