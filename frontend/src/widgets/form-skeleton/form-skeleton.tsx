import { Card, Skeleton, Button, CardBody } from "@nextui-org/react";

const FormSkeleton = () => {
  return (
    <div className="flex flex-col w-1/2 mr-auto ml-auto mt-20 gap-10">
      <Card className="border-t-8 border-purple-700">
        <CardBody className="flex flex-col w-full gap-2">
          <Skeleton className="w-full rounded-lg">
            <div className="h-10 w-3/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-col gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="w-full rounded-lg">
                <div className="h-6 w-3/5 rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="w-full rounded-lg">
                <div className="h-10 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          ))}
        </CardBody>
      </Card>

      <Skeleton className="w-full rounded-lg">
        <Button disabled className="w-full bg-default-300">Loading...</Button>
      </Skeleton>
    </div>
  );
};

export default FormSkeleton;