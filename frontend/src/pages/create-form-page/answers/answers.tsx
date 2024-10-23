import { Card, CardBody, User } from "@nextui-org/react";
import { FC } from "react"
import AnswersPiechart from "./ui/answers-piechart";
import { IAnswer } from "../../../entities/answer/model/answer";
import { IQuestion, QuestionType } from "../../../entities/question/model/question";
import AnswersVerticalBarChart from "./ui/answers-vertical-bar";
import InfiniteScroll from "react-infinite-scroll-component";

interface AnswersProps {
    answers: IAnswer[];
    questions: IQuestion[];
}

const Answers: FC<AnswersProps> = ({ answers, questions }) => {
    const renderAnswer = (question: IQuestion, answers: IAnswer[]) => {
        switch (question.type) {
          case QuestionType.text:
            return (
                <div className="w-full">
                <p className="text-base">{question.text}</p>
                <InfiniteScroll
                    className="flex flex-col w-full items-start m-0 p-5 gap-5"
                    dataLength={answers ? answers.length : 1}
                    hasMore={false}
                    next={() => console.log(answers.length)}
                    loader={answers.length !== 0 ? '' : <p>Loading...</p>}
                    height={200}
                >
                {
                    answers.map((answer) =>
                        <User
                            key={answer.id}
                            description={answer.answer}
                            name={answer.user_id.toString()}
                        />
                    )
                }
                </InfiniteScroll>
              </div>
            );
          case QuestionType.longText:
            return (
                <div className="w-full">
                 <p className="text-base">{question.text}</p>
                 <InfiniteScroll
                    className="flex flex-col w-full items-start m-0 p-5 gap-5"
                    dataLength={answers ? answers.length : 1}
                    hasMore={false}
                    next={() => console.log(answers.length)}
                    loader={answers.length !== 0 ? '' : <p>Loading...</p>}
                    height={200}
                >
                    {
                    answers.map((answer) =>
                        <User
                            key={answer.id}
                            description={answer.answer}
                            name={answer.user_id.toString()}
                        />
                    )
                }
                </InfiniteScroll>
              </div>
            );
          case QuestionType.radio:
            return (
                <div className="flex flex-col gap-2">
                <p className="text-base">{question.text}</p>
                <AnswersPiechart data={
                    transformArray(answers)
                }/>
              </div>
            );
          case QuestionType.select:
            return (
              <div className="flex flex-col gap-2">
                <p className="text-base">{question.text}</p>
                <AnswersPiechart data={
                    transformArray(answers)
                }/>
              </div>
            );
          case QuestionType.checkbox:
            return (
                <div className="flex flex-col gap-2">
                    <p className="text-base">{question.text}</p>
                    <AnswersVerticalBarChart 
                        choices={ answers.map(answer => answer.answer as string[])} 
                        initialOptions={question.options}
                    />
                </div>
            );
          default:
            return null;
        }
      };

    return (
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 mr-auto ml-auto gap-10">
            {
                questions.map((question) => 
                    <Card>
                        <CardBody className="flex flex-col gap-10">
                            { renderAnswer(question, answers.filter(answer => answer.question_id == question.id)) }
                        </CardBody>
                    </Card>
                )
            }
        </div>
    )
}

const transformArray = (inputArray: IAnswer[]) => {
    const answerCountMap: { [key: string]: number } = inputArray.reduce((acc, obj) => {
        if (typeof obj.answer === 'string') {
            acc[obj.answer] = (acc[obj.answer] || 0) + 1;
        }
        return acc;
    }, {} as { [key: string]: number });
    
    return Object.keys(answerCountMap).map(key => ({
        name: key,
        value: answerCountMap[key]
    }));
}

export default Answers;