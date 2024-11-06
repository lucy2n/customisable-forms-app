import { Card, Skeleton } from "@nextui-org/react";

const TicketSkeleton = () => {
  return (
    <Card className="w-1/4 h-[100px] col-span-12 sm:col-span-7">
      <Skeleton className="rounded-lg">
        <div className="h-52 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}

export default TicketSkeleton;