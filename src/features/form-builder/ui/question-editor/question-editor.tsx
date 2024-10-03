import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { useState } from 'react';
import remove from '../../../../assets/trash-03-2.svg';
import x from '../../../../assets/x-02.svg';

const QuestionEditor = ({ question, updateQuestion, removeQuestion, isActive, setActiveIndex }) => {
  const [label, setLabel] = useState(question.label || '');
  const [type, setType] = useState(question.type || 'text');
  const [options, setOptions] = useState(question.options || []);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    updateQuestion(question.id, { ...question, type: newType });
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    updateQuestion(question.id, { ...question, label: e.target.value });
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (optIndex, value) => {
    const updatedOptions = options.map((opt, i) => (i === optIndex ? value : opt));
    setOptions(updatedOptions);
    updateQuestion(question.id, { ...question, options: updatedOptions });
  };

  const removeOption = (optIndex) => {
    const updatedOptions = options.filter((_, i) => i !== optIndex);
    setOptions(updatedOptions);
    updateQuestion(question.id, { ...question, options: updatedOptions });
  };

  const handleInputClick = () => {
    setActiveIndex();
  };

  return (
    <Card
        className={`w-full flex flex-row question-editor relative ${isActive ? 'border-2 border-purple-700' : ''}`}
    >
      <CardBody className="w-full flex flex-wrap relative" onClick={handleInputClick}>
        <div className="flex pb-4">
            <Input
            className="w-1/2"
            type="text"
            variant="underlined"
            placeholder="Вопрос"
            value={label}
            onChange={handleLabelChange}
            />
             {isActive && (
                <select value={type} onChange={handleTypeChange} className="w-1/2">
                    <option value="text">Text</option>
                    <option value="radio">Radio Button</option>
                    <option value="checkbox">Checkbox</option>
                </select>
        )}
        </div>

        {isActive && (
            <Button
              isIconOnly
              className="w-8 h-8 ml-auto"
              onClick={() => removeQuestion(question.id)}
            >
              <img src={remove} alt="remove question"/>
            </Button>
        )}

        {type === 'radio' || type === 'checkbox' ? (
          <div>
            {options.map((opt, optIndex) => (
              <div key={optIndex}>
                <img type="radio" />
                <Input
                  className="w-1/2"
                  type="text"
                  variant="underlined"
                  value={opt}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                />
                <Button
                  className="w-6 h-6"
                  isIconOnly
                  color='success'
                  onClick={() => removeOption(question.id)}
                >
                  <img src={x} alt="delete option" />
                </Button>
              </div>
            ))}
            <Button className="w-1/2" onClick={addOption}>Add Option</Button>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default QuestionEditor;