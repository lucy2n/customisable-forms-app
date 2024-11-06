import { FC, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useAppSelector } from "../../app/routes/lib/hook";
import { RootState } from "../../app/appStore";
import { SummaryPriority } from "./lib/constants";
import { createJiraTicket } from "../../shared/api/jira";
import { useLocation } from "react-router-dom";
import { getTemplate } from "../../shared/api/template";

interface HelpFormProps {
    onClose: () => void;
}

const HelpForm: FC<HelpFormProps> = ({ onClose }) => {
    const location = useLocation();
    const user = useAppSelector((store: RootState) => store.user);
    
    const [priority, setPriority] = useState<SummaryPriority>(SummaryPriority.high);
    const [summary, setSummary] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formTitle, setFormTitle] = useState<string>('');
    
    const formIdMatch = location.pathname.match(/\/form\/([a-zA-Z0-9-]+)/);
    const formId = formIdMatch ? formIdMatch[1] : null;

    const userEmail = user.isLoggedIn ? user.email : email;
    const userDisplayName = user.isLoggedIn ? user.name : displayName;

    useEffect(() => {
        if (formId) {
            getTemplate(formId)
                .then(res => setFormTitle(res.title))
                .catch(err => console.error(err));
        }
    }, [formId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const ticket = {
            summary: summary, 
            priority: priority, 
            template: formTitle || '',
            pageLink: `https://customisable-forms-app.vercel.app/#${location.pathname}`, 
            displayName: userDisplayName,
            userEmail: userEmail
        };

        try {
            await createJiraTicket(ticket);
            onClose();
        } catch (err) {
            setError(`Failed to submit. Please try again. ${err}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="flex flex-col items-center gap-5 w-full p-5" onSubmit={handleSubmit}>
            {!user.isLoggedIn && (
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
                        isRequired 
                    />
                </>
            )}
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
            {error && <p className="text-red-500">{error}</p>}
            <Button
                size="lg"
                color="secondary"
                type="submit"
                className="w-1/4 font-mono"
                isDisabled={summary.length === 0 || userEmail.length === 0 || userDisplayName.length === 0}
                isLoading={isSubmitting}
            >
                Send
            </Button>
        </form>
    );
}

export default HelpForm;