import { FC, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useAppSelector } from "../../app/routes/lib/hook";
import { RootState } from "../../app/appStore";
import { SummaryPriority } from "./lib/constants";
import { createJiraTicket } from "../../shared/api/jira";
import { useLocation } from "react-router-dom";
import { base_url } from "../../shared/api/constants";

interface HelpFormProps {
    onClose: () => void;
}

const HelpForm:FC<HelpFormProps> = ({onClose}) => {
    const location = useLocation();

    const user = useAppSelector((store: RootState) => store.user);
    const [priority, setPriority] = useState<SummaryPriority>(SummaryPriority.high);
    const [summary, setSummary] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const userEmail = user.isLoggedIn ? user.email : email;
    const userDisplayName = user.isLoggedIn ? user.name : displayName;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ticket = {
            summary: summary, 
            priority: priority, 
            pageLink: `${base_url}${location.pathname}`, 
            displayName: userDisplayName,
            userEmail: userEmail
        }

        await createJiraTicket(ticket)
        .then(() => onClose())
        .catch((err) => setError(err))

    }

    if(user.salesforce_id) {
        return (
            <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-12 max-w-screen-xl">
            </main>
        )
    }

    return (
        <form className="flex flex-col items-center gap-5 w-full p-5" onSubmit={handleSubmit}>
            {
                !user.isLoggedIn && (
                    <>
                    <Input
                        type="text"
                        label="Username"
                        variant="bordered"
                        className="w-full"
                        onChange={(e) => setDisplayName(e.target.value)}
                        color={error ? "danger" : "secondary"}
                        isInvalid={!!error}
                        isRequired 
                    />
                    <Input
                        type="email"
                        label="Email"
                        variant="bordered"
                        className="w-full"
                        onChange={(e) => setEmail(e.target.value)}
                        color={error ? "danger" : "secondary"}
                        isInvalid={!!error}
                        isRequired />
                    </>
                )
            }
            <Textarea
                value={summary}
                type="text"
                label="Summary"
                variant="bordered"
                className="w-full"
                onChange={(e) => setSummary(e.target.value)}
                color={error ? "danger" : "secondary"}
                isInvalid={!!error}
                isRequired
            />
            <Select
                color="secondary"
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as SummaryPriority)}
            >
                {Object.values(SummaryPriority).map((priorityValue) => (
                    <SelectItem key={priorityValue} value={priorityValue}>
                        {priorityValue}
                    </SelectItem>
                ))}
            </Select>
            <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono" isDisabled={summary.length === 0 || userEmail.length === 0 || userDisplayName.length === 0 }>
                Send
            </Button>
        </form>
    )
}

export default HelpForm;