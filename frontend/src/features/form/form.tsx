import { FC, useState } from 'react';
import { Button, Card, CardBody, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Textarea, Select, SelectItem } from '@nextui-org/react';
import { IQuestion, QuestionType } from '../../entities/question/model/question';
import { ITemplate } from '../../entities/template/model/template';
import { IAnswer } from '../../entities/answer/model/answer';

interface IForm {
  template: ITemplate;
  questions: IQuestion[];
  userId: number;
}

const Form: FC<IForm> = ({ template, questions, userId }) => {
  // Состояние для хранения ответов в виде массива объектов IAnswer
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  // Обработчик сабмита формы
  const handleSubmitForm = async () => {
    const formData = {
      answers, // Сохраняем ответы в формате массива объектов IAnswer
    };
    console.log('Form submitted with answers:', formData);
  };

  // Обработчик изменения ответа на вопрос
  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers((prevAnswers) => {
      // Ищем, есть ли уже ответ на данный вопрос
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.question_id === questionId
      );

      // Создаем новый объект ответа
      const newAnswer: IAnswer = {
        id: existingAnswerIndex !== -1 ? prevAnswers[existingAnswerIndex].id : Date.now(), // Если есть ответ, сохраняем id, иначе генерируем новый
        question_id: questionId,
        user_id: userId,
        answer, // Записываем ответ (строка или массив строк)
      };

      // Обновляем ответ, если он уже существует, или добавляем новый
      if (existingAnswerIndex !== -1) {
        return [
          ...prevAnswers.slice(0, existingAnswerIndex),
          newAnswer,
          ...prevAnswers.slice(existingAnswerIndex + 1),
        ];
      } else {
        return [...prevAnswers, newAnswer];
      }
    });
  };

  // Функция для рендеринга вопросов в зависимости от их типа
  const renderQuestion = (question: IQuestion) => {
    const currentAnswer = answers.find((a) => a.question_id === question.id)?.answer || '';

    switch (question.type) {
      case QuestionType.text:
        return (
          <div className="flex flex-col gap-2">
            <p>{question.text}</p>
            <Input
              label="Short answer"
              key={question.id}
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </div>
        );
      case QuestionType.longText:
        return (
          <div className="flex flex-col gap-2">
            <p>{question.text}</p>
            <Textarea
              label="Long answer"
              key={question.id}
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </div>
        );
      case QuestionType.radio:
        return (
          <RadioGroup
            key={question.id}
            color="secondary"
            label={question.text}
            value={typeof currentAnswer === 'string' ? currentAnswer : ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          >
            {question.options.map((option) => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
        );
      case QuestionType.select:
        return (
          <div className="flex flex-col gap-2">
            <p>{question.text}</p>
            <Select
              key={question.id}
              color="secondary"
              label="Options"
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              {question.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>
        );
      case QuestionType.checkbox:
        return (
          <CheckboxGroup
            key={question.id}
            label={question.text}
            color="secondary"
            value={Array.isArray(currentAnswer) ? currentAnswer : []}
            onChange={(val) => handleAnswerChange(question.id, val)}
          >
            {question.options.map((option) => (
              <Checkbox key={option} value={option}>
                {option}
              </Checkbox>
            ))}
          </CheckboxGroup>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-1/2 mr-auto ml-auto gap-10">
      <Card className="border-t-8 border-purple-700">
        <CardBody className="flex flex-col w-full gap-2">
          <h2 style={{ fontSize: '38px' }}>{template.title}</h2>
          <p>{template.description}</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col gap-10">
          {questions.map(renderQuestion)}
        </CardBody>
      </Card>
      <Button color="secondary" onClick={handleSubmitForm}>
        Submit Form
      </Button>
    </div>
  );
};

export default Form;