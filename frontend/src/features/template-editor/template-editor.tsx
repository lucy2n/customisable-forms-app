import { FC, useState } from 'react';
import { Button, Input, Card, CardBody } from '@nextui-org/react';
import { ITemplate } from '../../entities/template/model/template';
import { IQuestion } from '../../entities/question/model/question';
import { updateTemplate } from '../../shared/api/template'; // Предположим, что эти API уже существуют
import QuestionEditor from '../template-builder/ui/question-editor/question-editor';
import { updateQuestion } from '../../shared/api/question';

interface ITemplateEditorProps {
    template: ITemplate;
    questions: IQuestion[];
}

const TemplateEditor: FC<ITemplateEditorProps> = ({ template, questions }) => {
    const [templateTitle, setTemplateTitle] = useState(template.title);
    const [templateDesc, setTemplateDesc] = useState(template.description);
    const [questionList, setQuestionList] = useState<IQuestion[]>(questions);
    const [activeIndex, setActiveIndex] = useState<string | null>(null);

    const handleUpdateTemplate = async () => {
        try {
            await updateTemplate(template.id, {
                title: templateTitle,
                description: templateDesc,
            });

            const questionPromises = questionList.map(q => updateQuestion(q.id, q));
            await Promise.all(questionPromises);

            console.log('Template updated successfully');
        } catch (err) {
            console.error('Failed to update template:', err);
        }
    };

    const handleUpdateQuestion = (id: string, updatedQuestion: IQuestion) => {
        const updatedQuestions = questionList.map((q) =>
            q.id === id ? { ...updatedQuestion } : q
        );
        setQuestionList(updatedQuestions);
    };

    return (
        <div className="flex flex-col w-1/2 mr-auto ml-auto gap-10">
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
                    />
                ))}
            </div>
            <Button color="secondary" onClick={handleUpdateTemplate}>
                Save Changes
            </Button>
        </div>
    );
};

export default TemplateEditor;