import { useEffect, useState } from 'react';
import QuestionEditor from './ui/question-editor/question-editor';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import add from '../../assets/plus-01.svg';
import { v4 as uuidv4 } from 'uuid';
import { IQuestion, QuestionType } from '../../entities/question/model/question';
import { useAppSelector } from '../../app/routes/lib/hook';
import { createTemplate } from '../../shared/api/template';
import { ITemplate } from '../../entities/template/model/template';

const TemplateBuilder = () => {
    const [templateTitle, setTemplateTitle] = useState('New form');
    const [templateDesc, setTemplateDesc] = useState('');
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [activeIndex, setActiveIndex] = useState<string | null>(null);
    const user = useAppSelector((store) => store.user);
    const template_id = uuidv4();
  
    const addQuestion = () => {
      setQuestions([
        ...questions, 
        {
          id: uuidv4(), 
          type: QuestionType.text, 
          text: '', 
          options: [], 
          template_id: template_id 
        }
      ]);
    };
  
    const updateQuestion = (id: string, updatedQuestion: IQuestion) => {
        const updatedQuestions = questions?.map((question) =>
          question.id === id ? { ...updatedQuestion } : question
        );
        setQuestions(updatedQuestions);
      };
  
    const removeQuestion = (id: string) => {
      const updatedQuestions = questions?.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    };
  
    const handleCreateTemplate = async () => {
      console.log(user);
      const templateData: ITemplate = {
        id: template_id,
        title: templateTitle,
        description: templateDesc,
        user_id: user.id,
        questions,
      };

      createTemplate(templateData)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      console.log('Template created:', templateData);
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
              value={templateTitle}
              style={{ fontSize: '38px' }}
              onChange={(e) => setTemplateTitle(e.target.value)}
            />
            <Input
              className="b-none"
              variant="underlined"
              type="text"
              size="lg"
              placeholder="Form Description"
              value={templateDesc}
              onChange={(e) => setTemplateDesc(e.target.value)}
            />
          </CardBody>
        </Card>
        <div className="flex flex-col gap-2">
          {questions?.map((question) => (
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
        <Button color="secondary" onClick={handleCreateTemplate}>Create Template</Button>
      </div>
    );
  };
  
export default TemplateBuilder;