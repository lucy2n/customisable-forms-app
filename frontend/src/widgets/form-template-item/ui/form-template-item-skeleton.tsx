import { Card, Skeleton, Button } from "@nextui-org/react";

const FormTemplateItemSkeleton = () => {
  return (
    <Card className="w-1/4 h-[300px] col-span-12 sm:col-span-7">
      <Skeleton className="rounded-lg">
        <div className="h-52 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center pt-3">
          <Skeleton className="w-1/5 rounded-lg">
            <div className="h-6 w-1/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <Button disabled className="w-full bg-default-300">Loading...</Button>
          </Skeleton>
        </div>
      </div>
    </Card>
  );
}

export default FormTemplateItemSkeleton;