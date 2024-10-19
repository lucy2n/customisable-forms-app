import { Button, Card, CardBody, Input, User } from "@nextui-org/react"
import { useState } from "react"

const Comments = () => {
    const [comment, setComment] = useState<string>('');
    const comments = [
        {
            username: 'Lucy',
            email: 'lysia.naumenko@gmail.com',
            text: 'The best form!'
        },
        {
            username: 'Lucy',
            email: 'lysia.naumenko@gmail.com',
            text: 'It"s real the best !'
        },
    ]

    return (
        <div className="flex flex-col w-1/2 mr-auto ml-auto gap-10">
            <Card>
                <CardBody className="flex flex-col w-full gap-2">
                    <p className="text-base font-medium text-xl uppercase font-mono pt-2 pl-2 pb-10">{comments.length} comments</p>
                    <Input
                    variant="bordered"
                    type="text"
                    color="secondary"
                    size="lg"
                    placeholder="Your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <Button color="secondary" isDisabled={comment.length === 0}>
                        Send comment
                    </Button>
                </CardBody>
            </Card>
            <div className="flex flex-col w-full items-start m-0 p-5 gap-5 border shadow-lg rounded-lg">
                {comments.map((com) => (
                    <User
                        description={com.text}
                        name={com.username}
                    >
                    </User>
                ))}
            </div>
        </div>
    )
}

export default Comments;