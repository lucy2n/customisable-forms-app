import {Card, CardHeader, CardFooter, Image, Button} from "@nextui-org/react";

const FormTemplateItem = () => {
    return (
        <Card isFooterBlurred className="w-1/4 h-[400px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src="https://img08.rl0.ru/afisha/e1200x800i/daily.afisha.ru/uploads/images/2/b2/2b2e08b175e4cb5f143daf2bda7658a0.png"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                <Image
                    alt="Breathing app icon"
                    className="rounded-full w-10 h-11 bg-black"
                    src="https://myart-therapy.ru/wp-content/uploads/2018/12/mabel_pines_2_by_philiptomkins-d8gj265-1.png"
                />
                <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Breathing App</p>
                    <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                </div>
                </div>
                <Button radius="full" size="sm">Use Template</Button>
            </CardFooter>
        </Card>
      );
}

export default FormTemplateItem;