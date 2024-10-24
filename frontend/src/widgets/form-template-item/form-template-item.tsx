import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Card, CardFooter, Image, Button, CardHeader, Tooltip } from "@nextui-org/react";
import { ITemplate } from "../../entities/template/model/template";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/routes/lib/hook";
import { deleteTemplate } from "../../shared/api/template";
import { getLikes, addLike, removeLike } from "../../shared/api/like";
import { ILike } from "../../entities/like/model/like";
import edit from '../../assets/icons8-edit.svg';
import like from '../../assets/icons8-heart-24.png';
import unlike from '../../assets/icons8-heart-24-2.png';
import DeleteModal from "./ui/delete-modal";
import { RootState } from "../../app/appStore";

interface FormTemplateItemProps {
    template: ITemplate;
    refresh: () => void;
}

const FormTemplateItem: FC<FormTemplateItemProps> = ({ template, refresh }) => {
    const user = useAppSelector((store: RootState) => store.user);
    const navigate = useNavigate();
    const hasRights = template.user_id + '' === user.id || user.is_admin;
    const [likes, setLikes] = useState<ILike[]>([]);
    const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false);

    const handleDeleteTemplate = (id: string) => {
        console.log(user)
        deleteTemplate(id)
            .then(() => refresh());
    }

    const toggleLike = () => {
        if (isLikedByUser) {
            removeLike(template.id)
                .then(() => {
                    setIsLikedByUser(false);
                    setLikes((prevLikes) => prevLikes.filter((like) => like.user_id !== +user.id));
                })
                .catch((err) => console.error(err));
        } else {
            const like = {
                id: uuidv4(),
                template_id: template.id,
                user_id: +user.id,
            };
            addLike(like)
                .then(() => {
                    setIsLikedByUser(true);
                    setLikes((prevLikes) => [...prevLikes, like]);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        getLikes(template.id)
            .then(res => {
                setLikes(res);
                setIsLikedByUser(res.some(like => like.user_id === +user.id));
            })
            .catch(err => console.log(err));
    }, [template.id, user.id]);

    return (
        <Card isFooterBlurred className="relative w-full h-[300px] sm:w-[48%] lg:w-[26%] max-w-1440px col-span-12 sm:col-span-6 lg:col-span-4 group">
            <CardHeader className="absolute z-10 top-1 justify-end !items-end">
                <div className="flex flex-grow gap-2 items-center">
                    <img
                        className={`w-6 h-6 cursor-pointer`}
                        src={isLikedByUser ? unlike : like}
                        alt="like form"
                        onClick={toggleLike}
                    />
                    <p className="text-base">{likes.length}</p>
                </div>
                {
                    hasRights &&
                    <div className="flex gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out">
                        <DeleteModal handleDeleteTemplate={handleDeleteTemplate} templateId={template.id}/>
                        <Button isIconOnly color="secondary" variant="light" size="sm" onClick={() => navigate(`/template/${template.id}/edit`)}>
                            <img src={edit} alt="edit form" />
                        </Button>
                    </div>
                }
            </CardHeader>

            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1728406970237-bc699733f027?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <CardFooter className="absolute bg-white/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                        <b className="text-base">{template.title}</b>
                    </div>
                </div>
                <Tooltip color="secondary" content="If you want to use this template you should be authorized">
                    <Button color="secondary" radius="full" size="sm" onClick={() => navigate(`/form/${template.id}`)}>{user.isLoggedIn ? 'Fill form' : 'View form'}</Button>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}

export default FormTemplateItem;