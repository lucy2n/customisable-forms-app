import { FC, useState } from 'react';
import { Button, Card, CardBody, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Textarea, Select, SelectItem } from '@nextui-org/react';
import { IQuestion, QuestionType } from '../../entities/question/model/question';
import { ITemplate } from '../../entities/template/model/template';

interface IForm {
  template: ITemplate,
  questions: IQuestion[]
}

const Form:FC<IForm> = ({template, questions}) => {
  // Состояние для хранения ответов
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

  // Обработчик сабмита формы
  const handleSubmitForm = async () => {
    const formData = {
      answers, // Сохраняем ответы
    };
    console.log('Form submitted with answers:', formData);
  };

  // Обработчик изменения ответа на вопрос
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value, // Сохраняем ответ с ключом ID вопроса
    }));
  };

  // Функция для рендеринга вопросов в зависимости от их типа
  const renderQuestion = (question: IQuestion) => {
    switch (question.type) {
      case QuestionType.text:
        return (
        <div className='flex flex-col gap-2'>
          <p>{question.text}</p>
          <Input
            label="Short answer"
            key={question.id}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
        );
        case QuestionType.longText:
        return (
        <div className='flex flex-col gap-2'>
          <p>{question.text}</p>
            <Textarea
                label="Long answer"
                key={question.id}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
        </div>
        );
      case QuestionType.radio:
        return (
          <RadioGroup key={question.id}
            color="secondary"
            label={question.text} >
            {question.options.map((option) => (
              <div key={option}>
                <Radio
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
                {option}
              </div>
            ))}
          </RadioGroup>
        );
        case QuestionType.select:
        return (
        <div className='flex flex-col gap-2'>
          <p>{question.text}</p>
          <Select key={question.id}
            color="secondary"
            label="Options" >
            {question.options.map((option) => (
                <SelectItem
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                >
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
            >
            {question.options.map((option) => (
              <div key={option}>
                <Checkbox
                  value={option}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newAnswers = checked
                      ? [...(answers[question.id] || []), option] // Добавляем опцию
                      : (answers[question.id] || []).filter((ans) => ans !== option); // Удаляем опцию
                    handleAnswerChange(question.id, newAnswers);
                  }}
                >
                    {option}
                </Checkbox>
              </div>
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
        <CardBody className='flex flex-col gap-10'>
            {questions.map(renderQuestion)}
        </CardBody>
      </Card>
      <Button color="secondary" onClick={handleSubmitForm}>Submit Form</Button>
    </div>
  );
};

export default Form;