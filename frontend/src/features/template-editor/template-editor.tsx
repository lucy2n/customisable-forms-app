import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Card, CardBody } from '@nextui-org/react';
import { ITemplate } from '../../entities/template/model/template';
import { IQuestion, QuestionType } from '../../entities/question/model/question';
import { updateTemplate } from '../../shared/api/template';
import QuestionEditor from '../template-builder/ui/question-editor/question-editor';
import { updateQuestion, deleteQuestion } from '../../shared/api/question';
import { useNavigate } from 'react-router-dom';
import { RoutePathname } from '../../app/routes/constants';

interface ITemplateEditorProps {
    template: ITemplate;
    questions: IQuestion[];
}

const TemplateEditor: FC<ITemplateEditorProps> = ({ template, questions }) => {
    const [templateTitle, setTemplateTitle] = useState(template.title);
    const [templateDesc, setTemplateDesc] = useState(template.description);
    const [questionList, setQuestionList] = useState<IQuestion[]>(questions);
    const [activeIndex, setActiveIndex] = useState<string | null>(null);
    const navigate = useNavigate()

    const addQuestion = () => {
        setQuestionList([
          ...questionList, 
          {
            id: uuidv4(), 
            type: QuestionType.text, 
            text: '', 
            options: [], 
            template_id: template.id,
            is_required: false
          }
        ]);
    };

    const removeQuestion = async (id: string) => {
        try {
            await deleteQuestion(id);
            setQuestionList(questionList.filter((question) => question.id !== id));
        } catch (err) {
            console.error('Failed to delete question:', err);
        }
    };

    const handleUpdateTemplate = async () => {
        try {
            await updateTemplate(template.id, {
                title: templateTitle,
                description: templateDesc,
            });

            const questionPromises = questionList.map(question => updateQuestion(question.id, question));
            await Promise.all(questionPromises);

            console.log('Template updated successfully');
            navigate(RoutePathname.homePage);
        } catch (err) {
            console.error('Failed to update template:', err);
        }
    };

    const handleUpdateQuestion = (id: string, updatedQuestion: IQuestion) => {
        const updatedQuestions = questionList.map((question) =>
            question.id === id ? { ...updatedQuestion } : question
        );
        setQuestionList(updatedQuestions);
    };

    return (
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 mr-auto ml-auto gap-10">
            <Card className="border-t-8 border-purple-700">
                <CardBody className="flex flex-col w-full gap-2">
                    <Input
                        variant="underlined"
                        type="text"
                        size="lg"
                        placeholder="Form Title"
                        style={{ fontSize: '38px' }}
                        value={templateTitle}
                        onChange={(e) => setTemplateTitle(e.target.value)}
                    />
                    <Input
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
                {questionList.map((question) => (
                    <QuestionEditor
                        isActive={activeIndex === question.id}
                        setActiveIndex={() => setActiveIndex(question.id)}
                        key={question.id}
                        question={question}
                        updateQuestion={handleUpdateQuestion}
                        removeQuestion={removeQuestion}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-2">
                <Button isIconOnly onClick={addQuestion} color="secondary">
                    <p>Add</p>
                </Button>
            </div>
            <Button color="secondary" onClick={handleUpdateTemplate}>
                Save Changes
            </Button>
        </div>
    );
};

export default TemplateEditor;