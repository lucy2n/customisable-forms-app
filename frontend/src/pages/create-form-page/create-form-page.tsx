import { useParams } from "react-router-dom";
import Form from "../../features/form/form";
import { useEffect, useState } from "react";
import { ITemplate } from "../../entities/template/model/template";
import { IQuestion } from "../../entities/question/model/question";
import { getTemplate } from "../../shared/api/template";
import { getQuestions } from "../../shared/api/question";

const CreateFormPage = () => {
    const { id } = useParams<{ id: string }>();  // Определяем тип для id
    const [template, setTemplate] = useState<ITemplate>();
    const [questions, setQuestions] = useState<IQuestion[]>();

    useEffect(() => {
        if (id) {
            getTemplate(id)
                .then(res => {
                    console.log(res);
                    setTemplate(res);
                    getQuestions(id)
                    .then(res => {
                        setQuestions(res);
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24">
            {template && questions &&
                <Form template={template} questions={questions} />
            }
        </main>
    );
};

export default CreateFormPage;