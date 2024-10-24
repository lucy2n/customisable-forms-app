import { Button, Card, CardBody, Input, Switch } from '@nextui-org/react';
import { useState, useEffect, FC, ChangeEvent } from 'react';
import remove from '../../../../assets/trash-03-2.svg';
import x from '../../../../assets/x-02.svg';
import { IQuestion, QuestionType } from '../../../../entities/question/model/question';

interface IQuestionEditorProps {
    question: IQuestion;
    updateQuestion: (id: string, updatedQuestion: IQuestion) => void;
    removeQuestion?: (id: string) => void;
    isActive: boolean;
    setActiveIndex: (id: string) => void;
}

const QuestionEditor: FC<IQuestionEditorProps> = ({ question, updateQuestion, removeQuestion, isActive, setActiveIndex })  => {
  const [text, setText] = useState(question.text || '');
  const [type, setType] = useState(question.type || 'text');
  const [isRequired, setIsRequired] = useState<boolean>(false)
  const [options, setOptions] = useState(question.options || []);

  useEffect(() => {
    setText(question.text);
    setType(question.type);
    setIsRequired(question.is_required);
    setOptions(question.options);
  }, [question]);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    setType(newType);
    updateQuestion(question.id, { ...question, type: newType, options: [] });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    updateQuestion(question.id, { ...question, text: e.target.value });
  };

  const handleRequiredChange = () => {
    const newIsRequired = !isRequired;
    setIsRequired(newIsRequired);
    updateQuestion(question.id, { ...question, is_required: newIsRequired });
  };

  const addOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
    updateQuestion(question.id, { ...question, options: newOptions });
  };

  const updateOption = (optIndex: number, value: string) => {
    const updatedOptions = options.map((opt, i) => (i === optIndex ? value : opt));
    setOptions(updatedOptions);
    updateQuestion(question.id, { ...question, options: updatedOptions });
  };

  const removeOption = (optIndex: number) => {
    const updatedOptions = options.filter((_, i) => i !== optIndex);
    setOptions(updatedOptions);
    updateQuestion(question.id, { ...question, options: updatedOptions });
  };

  const handleInputClick = () => {
    setActiveIndex(question.id);
  };

  return (
    <Card
      className={`w-full flex flex-row question-editor relative ${isActive ? 'border-2 border-purple-700' : ''}`}
    >
      <CardBody className="w-full flex flex-wrap relative" onClick={handleInputClick}>
        <div className="flex pb-4">
          <Input
            className={`${isActive ? 'w-1/2' : 'w-full' }`}
            type="text"
            variant="underlined"
            placeholder="Question"
            value={text}
            onChange={handleTextChange}
          />
          {isActive && (
            <select value={type} onChange={handleTypeChange} className="w-1/2">
              <option value="text">Text</option>
              <option value="longText">Textarea</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Button</option>
              <option value="select">Select</option>
            </select>
          )}
        </div>

        {isActive && removeQuestion &&(
          <Button
            isIconOnly
            className="w-8 h-8 ml-auto"
            onClick={() => removeQuestion(question.id)}
            color="secondary"
          >
            <img src={remove} alt="remove question" />
          </Button>
        )}

        {isActive && removeQuestion && (
          <div className="flex">
            <Switch
              color="success"
              defaultSelected
              aria-label="Automatic updates"
              isSelected={isRequired}
              onChange={handleRequiredChange}
            />
            <p className="text-base">Required</p>
          </div>
        )}

        {(type === 'radio' || type === 'checkbox' || type === 'select') && (
          <div className="flex flex-col gap-2">
            {options.map((opt, optIndex) => (
              <div key={optIndex} className="flex">
                <Input
                  className="w-1/2"
                  type="text"
                  placeholder="Your option"
                  variant="underlined"
                  value={opt}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                />
                {isActive && (
                  <Button
                    className="w-4 h-8"
                    isIconOnly
                    color="success"
                    onClick={() => removeOption(optIndex)}
                  >
                    <img src={x} alt="delete option" />
                  </Button>
                )}
              </div>
            ))}
            {isActive && (
              <Button className="w-1/2" onClick={addOption} color="secondary">Add Option</Button>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default QuestionEditor;
