import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react"
import AnswersPiechart from "./ui/answers-piechart";

const Answers = () => {
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
                    <AnswersPiechart data={[
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]}/>
                </CardBody>
            </Card>
        </div>
    )
}

export default Answers;