import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import remove from '../../../../assets/trash-03-2.svg';
import x from '../../../../assets/x-02.svg';

const QuestionEditor = ({ question, updateQuestion, removeQuestion, isActive, setActiveIndex }) => {
  const [label, setLabel] = useState(question.label || '');
  const [type, setType] = useState(question.type || 'text');
  const [options, setOptions] = useState(question.options || []);

  useEffect(() => {
    // Обновляем локальные состояния при изменении вопроса
    setLabel(question.label);
    setType(question.type);
    setOptions(question.options);
  }, [question]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    updateQuestion(question.id, { ...question, type: newType, options: [] });
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    updateQuestion(question.id, { ...question, text: e.target.value });
  };

  const addOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
    updateQuestion(question.id, { ...question, options: newOptions });
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
    setActiveIndex(question.id);
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
            color="secondary"
          >
            <img src={remove} alt="remove question" />
          </Button>
        )}

        {(type === 'radio' || type === 'checkbox') && (
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
