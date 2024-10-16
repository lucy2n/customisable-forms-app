import { useParams } from "react-router-dom";
import Form from "../../features/form/form";
import { useEffect, useState } from "react";
import { ITemplate } from "../../entities/template/model/template";
import { IQuestion } from "../../entities/question/model/question";
import { getTemplate } from "../../shared/api/template";
import { getQuestions } from "../../shared/api/question";

const CreateFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const [template, setTemplate] = useState<ITemplate | undefined>();
    const [questions, setQuestions] = useState<IQuestion[] | undefined>();

    useEffect(() => {
        if (id) {
            getTemplate(id)
                .then(res => setTemplate(res))
                .catch(err => console.log(err));

            getQuestions(id)
                .then(res => setQuestions(res))
                .catch(err => console.log(err));
        }
    }, [id]);

    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24">
            <Form template={template} questions={questions} />
        </main>
    );
};

export default CreateFormPage;