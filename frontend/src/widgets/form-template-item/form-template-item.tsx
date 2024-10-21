import {Card, CardFooter, Image, Button, CardHeader, Tooltip} from "@nextui-org/react";
import { ITemplate } from "../../entities/template/model/template";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/routes/lib/hook";
import trash from '../../assets/trash-03-2.svg';
import edit from '../../assets/icons8-edit.svg';
import { deleteTemplate } from "../../shared/api/template";
import { FC } from "react";

interface FormTemplateItemProps {
    template: ITemplate,
    refresh: () => void
}

const FormTemplateItem:FC<FormTemplateItemProps> = ({template, refresh}) => {
    const user = useAppSelector((store) => store.user);
    const navigate = useNavigate();
    const hasRights = template.user_id + '' === user.id || user.is_admin;

    const handleDeleteTemplate = (id: string) => {
        deleteTemplate(id)
        .then(() => refresh());
    }

    return (
            <Card isFooterBlurred className="relative w-1/4 h-[300px] col-span-12 sm:col-span-7">
                {
                    hasRights && 
                        <CardHeader className="absolute z-10 top-1 justify-end !items-end">
                            <Button isIconOnly color="secondary" variant="light" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                                    <img src={trash} alt="delete form" />
                            </Button>
                            <Button color="secondary" variant="light" radius="full" size="sm" onClick={() => navigate(`/template/${template.id}/edit`)}>
                                <img src={edit} alt="edit form" />
                            </Button>
                    </CardHeader>
                }
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1727949236824-d3227df462bc?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            <CardFooter className="absolute bg-white/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                    <b className="text-base">{template.title}</b>
                </div>
                </div>
                <Tooltip color="secondary" content="If you want to use this template you should be authorized">
                     <Button color="secondary" radius="full" size="sm" onClick={() => navigate(`/form/${template.id}`)}>Fill form</Button>
                 </Tooltip>
            </CardFooter>
            </Card>
          );
}

export default FormTemplateItem;