import { Card, CardBody } from "@nextui-org/react";
import { FC, useEffect } from "react"
import AnswersPiechart from "./ui/answers-piechart";
import { IAnswer } from "../../../entities/answer/model/answer";
import { IQuestion, QuestionType } from "../../../entities/question/model/question";
import AnswersVerticalBarChart from "./ui/answers-vertical-bar";

interface AnswersProps {
    answers: IAnswer[];
    questions: IQuestion[];
}

const Answers: FC<AnswersProps> = ({ answers, questions }) => {

    useEffect(() => {
        console.log(answers, questions);
    }, [answers, questions]);

    return (
        <div className="flex flex-col w-1/2 mr-auto ml-auto gap-10">
            {
                questions.map((question) => 
                    <Card>
                         { renderAnswer(question, answers.filter(answer => answer.question_id == question.id)) }
                    </Card>
                )
            }
        </div>
    )
}

  // Функция для рендеринга вопросов в зависимости от их типа
  const renderAnswer = (question: IQuestion, answers: IAnswer[]) => {
    switch (question.type) {
      case QuestionType.text:
        return (
          <div className="flex flex-col gap-2">
            <p>{question.text}</p>
            {
                answers.map((answer) =>
                    <p>{ answer.answer }</p>
                )
            }
          </div>
        );
      case QuestionType.longText:
        return (
          <div className="flex flex-col gap-2">
            <p>{question.text}</p>
            {
                answers.map((answer) =>
                    <p>{ answer.answer }</p>
                )
            }
          </div>
        );
      case QuestionType.radio:
        return (
            <div className="flex flex-col gap-2">
            <p>{question.text}</p>
            <AnswersPiechart data={
                transformArray(answers)
            }/>
          </div>
        );
      case QuestionType.select:
        return (
          <div className="flex flex-col gap-2">
            <p>{question.text}</p>
          </div>
        );
      case QuestionType.checkbox:
        return (
            <div className="flex flex-col gap-2">
                <p>{question.text}</p>
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

const transformArray = (inputArray: IAnswer[]) => {
    const answerCountMap: { [key: string]: number } = inputArray.reduce((acc, obj) => {
        acc[obj.answer] = (acc[obj.answer] || 0) + 1;
        return acc;
    }, {});

    // Transform the map into the desired array format
    return Object.keys(answerCountMap).map(key => ({
        name: key,
        value: answerCountMap[key]
    }));
}

export default Answers;