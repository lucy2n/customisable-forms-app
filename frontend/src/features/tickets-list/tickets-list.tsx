import { FC, useState } from "react";
import Ticket from "../ticket/ticket";
import { IJiraTicket } from "../../entities/jira-ticket/jira-ticket";
import TicketSkeleton from "../ticket/ui/ticket-skeleton";
import { Card, CardBody, Pagination } from "@nextui-org/react";

interface ITicketsListProps {
    loading: boolean;
    tickets: IJiraTicket[];
}

const TicketsList: FC<ITicketsListProps> = ({ loading, tickets }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTickets = tickets.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    if(tickets.length === 0 && !loading) {
        return (
            <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24 max-w-screen-xl mb-[10%]">
                <Card className="sm:w-2/3 md:w-1/2 lg:w-1/2 lg:p-10 md:p-10 sm:p-0 border-1 border-green-500 border-dotted">
                    <CardBody className="w-full flex flex-col items-center">
                        <p className="font-mono text-center">You don't have any tickets.</p>
                    </CardBody>
                </Card>
            </main>
        )
    }

    return (
        <section className="flex flex-col w-full gap-10 items-center max-w-screen-xl pt-24">
            <div className="flex flex-wrap w-full gap-10 justify-center">
                {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                        <TicketSkeleton key={index} />
                    ))
                ) : (
                    currentTickets.map((ticket, index) => (
                        <Ticket ticket={ticket} key={index} />
                    ))
                )}
            </div>
            {totalPages > 1 && (
                <Pagination
                    total={totalPages}
                    initialPage={1}
                    color="secondary"
                    page={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            )}
        </section>
    );
};

export default TicketsList;