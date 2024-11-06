import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const Ticket = ({ ticket }: { ticket: any }) => {
    return (
        <Card className="w-full h-[100px] sm:w-[48%] lg:w-[26%] max-w-1440px col-span-12 sm:col-span-6 lg:col-span-4 group border-1 border-green-500 border-dotted">
            <CardHeader className="w-full flex-row justify-between items-center">
                <NavLink 
                    target="_blank" 
                    to={`https://lysianaumenko2002.atlassian.net/browse/${ticket.key}`} 
                    className="text-purple-700 text-sm font-mono"
                >
                    Link to ticket
                </NavLink>
                <Chip className="text-sm font-mono" color="secondary">
                    {ticket.fields.status.name}
                </Chip>
            </CardHeader>
            <CardBody className="w-full flex justify-center">
                <p 
                    className="text-base overflow-hidden whitespace-nowrap text-ellipsis" 
                    style={{ maxWidth: "90%" }}
                >
                    {ticket.fields.summary}
                </p>
            </CardBody>
        </Card>
    );
}

export default Ticket;