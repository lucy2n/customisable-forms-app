import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITemplate } from "../../entities/template/model/template";
import { IQuestion } from "../../entities/question/model/question";
import { getTemplate } from "../../shared/api/template";
import { getQuestions } from "../../shared/api/question";
import TemplateEditor from "../../features/template-editor/template-editor";
import FormSkeleton from "../../widgets/form-skeleton/form-skeleton";

const EditTemplatePage = () => {
    const { id } = useParams();
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
                        console.log(res)
                        setQuestions(res);
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    if (!template || !questions) {
        return <FormSkeleton />;
    }

    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24">
            <TemplateEditor template={template} questions={questions} />
        </main>
    );
};

export default EditTemplatePage;