import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './ui/question-editor/question-editor';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import add from '../../assets/plus-01.svg';
import { IQuestion, QuestionType } from '../../entities/question/model/question';

const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState('New form');
    const [formDesc, setFormDesc] = useState('');
    const [questions, setQuestions] = useState<IQuestion[]>([
      {
        id: uuidv4(),
        type: QuestionType.text,
        text: '',
        options: [],
      },
    ]);
    const [activeIndex, setActiveIndex] = useState<string | null>(null);
  
    const addQuestion = () => {
      setQuestions([...questions, { id: uuidv4(), type: QuestionType.text, text: '', options: [] }]);
    };
  
    const updateQuestion = (id: string, updatedQuestion: IQuestion) => {
        const updatedQuestions = questions.map((question) =>
          question.id === id ? { ...updatedQuestion } : question
        );
        setQuestions(updatedQuestions);
      };
  
    const removeQuestion = (id: string) => {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    };
  
    const handleSubmitForm = async () => {
      const formData = {
        title: formTitle,
        description: formDesc,
        questions,
      };
      console.log('Form created:', formData);
    };
  
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          const target = e.target as Element | null;
      
          if (target && !target.closest('.question-editor')) {
            setActiveIndex(null);
          }
        };
      
        document.addEventListener('click', handleClickOutside);
      
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
  
    return (
      <div className="flex flex-col w-1/2 mr-auto ml-auto gap-10">
        <Card className="border-t-8 border-purple-700">
          <CardBody className="flex flex-col w-full gap-2">
            <Input
              variant="underlined"
              type="text"
              size="lg"
              placeholder="Form Title"
              value={formTitle}
              style={{ fontSize: '38px' }}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <Input
              className="b-none"
              variant="underlined"
              type="text"
              size="lg"
              placeholder="Form Description"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
            />
          </CardBody>
        </Card>
        <div className="flex flex-col gap-2">
          {questions.map((question) => (
            <QuestionEditor
              isActive={activeIndex === question.id}
              setActiveIndex={() => setActiveIndex(question.id)}
              key={question.id}
              question={question}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
            />
          ))}
          <div className="flex justify-end mt-2">
            <Button isIconOnly onClick={addQuestion} color="secondary">
              <img src={add} alt="add" />
            </Button>
          </div>
        </div>
        <Button color="secondary" onClick={handleSubmitForm}>Submit Form</Button>
      </div>
    );
  };
  
export default FormBuilder;