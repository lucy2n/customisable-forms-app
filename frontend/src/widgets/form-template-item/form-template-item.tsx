import {Card, CardFooter, Image, Button, CardBody, Tooltip} from "@nextui-org/react";
import { ITemplate } from "../../entities/template/model/template";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/routes/lib/hook";

const FormTemplateItem = ({template} : {template: ITemplate}) => {
    const user = useAppSelector((store) => store.user);
    const navigate = useNavigate();
    const isCreator = template.user_id + '' === user.id;

    return (
        <Card isFooterBlurred className="w-1/4 h-[300px] col-span-12 sm:col-span-7">
            <CardBody className="overflow-visible p-0">
            <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={template.title}
                className="w-full object-cover h-[240px]"
                src="https://img08.rl0.ru/afisha/e1200x800i/daily.afisha.ru/uploads/images/2/b2/2b2e08b175e4cb5f143daf2bda7658a0.png"
                />
            </CardBody>
             <CardFooter className="text-small justify-between">
                <div>
                    <b className="text-base">{template.title}</b>
                    <p className="text-default-500">{template.description}</p>
                </div>
                <div>
                <Tooltip color="secondary" content="If you want to use this template you should be authorized">
                    <Button color="secondary" variant="flat" radius="full" size="sm" onClick={() => navigate(`/form/${template.id}`)}>Use Template</Button>
                </Tooltip>
                {
                    isCreator && 
                    <Button color="secondary" variant="flat" radius="full" size="sm" onClick={() => navigate(`/template/${template.id}/edit`)}>Edit</Button>
                }
                </div>
          </CardFooter>
        </Card>
      );
}

export default FormTemplateItem;