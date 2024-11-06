import { Tabs, Tab } from "@nextui-org/react";
import { FC } from "react";
import salesforce from '../../../assets/image.png';

interface ProfileTabsProps {
    updateTab: (tab: string) => void;
    isAdmin: boolean,
}

const ProfileTabs: FC<ProfileTabsProps> = ({ updateTab, isAdmin }) => {
    return (
        <div className="flex w-full justify-center items-center flex-col">
            <Tabs
                aria-label="Options"
                color="secondary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-rgb(67 56 202)",
                }}
                onSelectionChange={key => updateTab(key as string)}
            >
                <Tab
                    key="My templates"
                    title={<div className="flex items-center space-x-2"><span>My templates</span></div>}
                />
                {
                    isAdmin &&
                    <Tab
                        key="Admin"
                        title={<div className="flex items-center space-x-2"><span>Admin</span></div>}
                    />
                }
                <Tab
                    title={
                        <div className="flex space-x-2">
                          <img className="w-8 h-6" src={salesforce} alt='salesforce'/>
                          <span>Salesforce</span>
                        </div>
                      }
                    key="Salesforce"
                />
                <Tab
                    title={<div className="flex items-center space-x-2"><span>Tickets</span></div>}
                    key="Tickets"
                />
            </Tabs>
        </div>
    );
};

export default ProfileTabs;