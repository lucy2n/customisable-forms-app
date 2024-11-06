import { FC, useEffect, useState } from "react";
import Ticket from "../ticket/ticket";
import { getTickets } from "../../shared/api/jira";
import { IJiraTicket } from "../../entities/jira-ticket/jira-ticket";
import { IUser } from "../../entities/user/model/user";
import TicketSkeleton from "../ticket/ui/ticket-skeleton";
import { Pagination } from "@nextui-org/react";

interface ITicketsListProps {
    user: IUser;
}

const TicketsList: FC<ITicketsListProps> = ({ user }) => {
    const [tickets, setTickets] = useState<IJiraTicket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        getTickets(user.email)
            .then(res => setTickets(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTickets = tickets.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    if (loading) {
        return (
            <section className="flex flex-wrap w-full gap-10 h-[400px] justify-center max-w-screen-xl pt-24">
                <TicketSkeleton />
                <TicketSkeleton />
                <TicketSkeleton />
                <TicketSkeleton />
                <TicketSkeleton />
            </section>
        );
    }

    return (
        <section className="flex flex-col w-full gap-10 items-center max-w-screen-xl pt-24">
            <div className="flex flex-wrap w-full gap-10 justify-center h-[300px]">
                {currentTickets.map((ticket, index) => (
                    <Ticket ticket={ticket} key={index} />
                ))}
            </div>
            {totalPages > 1 && 
                 <Pagination
                 total={totalPages}
                 initialPage={1}
                 color="secondary"
                 page={currentPage}
                 onChange={(page) => setCurrentPage(page)}
             />
            }
        </section>
    );
};

export default TicketsList;