import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from './ui/question-editor/question-editor';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import add from '../../assets/plus-01.svg';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('New form');
  const [formDesc, setFormDesc] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      type: 'text',
      label: 'Ваш вопрос',
      options: [],
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(null);

  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), type: 'text', label: '', options: [] }]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? updatedQuestion : q));
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleSubmitForm = async () => {
    const formData = {
      title: formTitle,
      description: formDesc,
      questions,
    };

    // Send form data to backend via API (POST /forms)
    const response = await fetch('/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log('Form created:', result);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.question-editor')) {
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
          <Button isIconOnly onClick={addQuestion}>
            <img src={add} alt="add" />
          </Button>
        </div>
      </div>
      <Button onClick={handleSubmitForm}>Submit Form</Button>
    </div>
  );
};

export default FormBuilder;


// import { useState } from 'react';
// import { Input, RadioGroup, Checkbox, Button, Radio } from '@nextui-org/react';

// interface IField {
//     id: number;
//     title: string;
//     description: string;
//     type: string;
// }

// const FormBuilder = () => {
//   const [fields, setFields] = useState<IField[]>([]);
//   const [title, setTitle] = useState('New form');
//   const [description, setDescription] = useState('It is your form description');
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [isEditingDescription, setIsEditingDescription] = useState(false);

//   const handleChange = (e) => {
//     if (isEditingTitle) {
//       setTitle(e.target.value);
//     } else if (isEditingDescription) {
//       setDescription(e.target.value);
//     }
//   };

//   const addField = (type) => {
//     setFields([...fields, { type, value: '', label: 'Введите метку', id: Date.now() }]);
//   };

//   const handleFieldChange = (id, newValue, fieldName) => {
//     setFields(fields.map(field => 
//       field.id === id ? { ...field, [fieldName]: newValue } : field
//     ));
//   };

//   const renderField = (field) => {
//     switch (field.type) {
//       case 'text':
//         return (
//           <div key={field.id}>
//             <input 
//               type="text" 
//               placeholder="Изменить метку" 
//               value={field.label}
//               onChange={(e) => handleFieldChange(field.id, e.target.value, 'label')} 
//             />
//             <Input 
//               value={field.value} 
//               onChange={(val) => handleFieldChange(field.id, val, 'value')} 
//             />
//           </div>
//         );
//       case 'checkbox':
//         return (
//           <div key={field.id}>
//             <input 
//               type="text" 
//               placeholder="Изменить метку" 
//               value={field.label}
//               onChange={(e) => handleFieldChange(field.id, e.target.value, 'label')} 
//             />
//             <Checkbox 
//               onChange={(e) => handleFieldChange(field.id, e.target.checked, 'value')} 
//               label={field.label} 
//               isChecked={field.value}
//             />
//           </div>
//         );
//       case 'radio':
//         return (
//           <div key={field.id}>
//             <input 
//               type="text" 
//               placeholder="Изменить метку" 
//               value={field.label}
//               onChange={(e) => handleFieldChange(field.id, e.target.value, 'label')} 
//             />
//             <RadioGroup 
//               onChange={(val) => handleFieldChange(field.id, val, 'value')} 
//               label={field.label}
//             >
//               <Radio value="option1">Option 1</Radio>
//               <Radio value="option2">Option 2</Radio>
//             </RadioGroup>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <Button onClick={() => addField('text')}>Добавить текстовое поле</Button>
//       <Button onClick={() => addField('checkbox')}>Добавить чекбокс</Button>
//       <Button onClick={() => addField('radio')}>Добавить радиокнопки</Button>

//       <form>
//         {isEditingTitle ? (
//           <Input 
//             variant="bordered"
//             size="lg"
//             value={title} 
//             onChange={handleChange} 
//             className="m-0 p-0 font-mono text-4xl"
//             onBlur={() => setIsEditingTitle(false)} 
//             autoFocus
//           />
//         ) : (
//           <h2 className="m-0 p-0 font-mono text-4xl" onClick={() => setIsEditingTitle(true)}>
//             {title}
//           </h2>
//         )}

//         {isEditingDescription ? (
//           <Input 
//             value={description} 
//             size="lg"
//             onChange={handleChange} 
//             className="m-0 p-0 font-mono text-4xl"
//             onBlur={() => setIsEditingDescription(false)} 
//             autoFocus
//           />
//         ) : (
//           <p onClick={() => setIsEditingDescription(true)}>
//             {description}
//           </p>
//         )}

//         {fields.map(renderField)}
//       </form>
//     </div>
//   );
// };

// export default FormBuilder;
