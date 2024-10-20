import { Tabs, Tab } from "@nextui-org/react";
import { FC } from "react";

interface FormTabsProps {
    updateTab: (tab: string) => void;
}

const FormTabs: FC<FormTabsProps> = ({ updateTab }) => {
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
                    key="Form"
                    title={<div className="flex items-center space-x-2"><span>Form</span></div>}
                />
                <Tab
                    key="Comments"
                    title={<div className="flex items-center space-x-2"><span>Comments</span></div>}
                />
                <Tab
                    key="Answers"
                    title={<div className="flex items-center space-x-2"><span>Answers</span></div>}
                />
            </Tabs>
        </div>
    );
};

export default FormTabs;