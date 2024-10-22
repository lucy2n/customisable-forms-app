import { Button, Card, CardBody, Input, User } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { createComment, getComments } from "../../../shared/api/comments";
import { IComment } from "../../../entities/comment/model/comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from 'uuid';
import ItemSkeleton from "../item-skeleton/item-skeleton";

interface CommentsProps {
    templateId: string;
    userId?: number;
}

const Comments: FC<CommentsProps> = ({ templateId, userId }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmitComment = async () => {
        if (!userId) return; 

        const commentData: IComment = {
            id: uuidv4(),
            user_id: +userId,
            template_id: templateId,
            text: inputValue,
        };

        try {
            await createComment(commentData);
            setComments((prevComments) => [...prevComments, commentData]);
            setInputValue('');
        } catch (err) {
            console.error("Error creating comment:", err);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getComments(templateId)
            .then(res => {
                setComments(res);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [templateId]);

    if (isLoading) {
        return <ItemSkeleton />
    }

    return (
        <div className="flex flex-col w-1/2 mr-auto ml-auto gap-10">
            <Card>
                <CardBody className="flex flex-col w-full gap-2">
                    <p className="text-base font-medium text-xl uppercase font-mono pt-2 pl-2 pb-10">{comments?.length} comments</p>
                    <Input
                        variant="bordered"
                        type="text"
                        color="secondary"
                        size="lg"
                        placeholder="Your comment"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        isReadOnly={!userId}
                    />
                    <Button color="secondary" isDisabled={inputValue.length === 0 || !userId} onClick={handleSubmitComment}>
                        Send comment
                    </Button>
                </CardBody>
            </Card>
            {comments.length !== 0 &&
                <div className="w-full">
                <InfiniteScroll
                    className="flex flex-col w-full items-start m-0 p-5 gap-5 border shadow-lg rounded-lg"
                    dataLength={comments ? comments.length : 1}
                    hasMore={false}
                    next={() => console.log(comments.length)}
                    loader={comments.length !== 0 ? '' : <p>Loading...</p>}
                    height={250}
                >
                {comments.map((com) => (
                    <User
                        key={com.id}
                        description={com.text}
                        name={com.user_id.toString()}
                    />
                ))}
                </InfiniteScroll>  
                </div>
            }
        </div>
    );
};

export default Comments;