import { useParams } from "react-router-dom";
import Form from "../../features/form/form";
import { useEffect, useState } from "react";
import { ITemplate } from "../../entities/template/model/template";
import { IQuestion } from "../../entities/question/model/question";
import { getTemplate } from "../../shared/api/template";
import { getQuestions } from "../../shared/api/question";
import { useAppSelector } from "../../app/routes/lib/hook";
import FormTabs from "./form-tabs/form-tabs";
import Comments from "./comments/comments";
import Answers from "./answers/answers";

const CreateFormPage = () => {
    const { id } = useParams();
    const [template, setTemplate] = useState<ITemplate>();
    const [questions, setQuestions] = useState<IQuestion[]>();
    const user = useAppSelector((store) => store.user);
    const [selectedTab, setSelectedTab] = useState<string>('Form');

    const updateTab = (tab: string) => {
        setSelectedTab(tab);
    };

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
        return <div>Loading...</div>;
    }

    const isCreator = template.user_id + '' === user.id;

    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-10 gap-10">
            <FormTabs updateTab={updateTab}/>
            {selectedTab === 'Form' && (
               <Form template={template} questions={questions} userId={+user.id} />
            )}
            {selectedTab === 'Comments' && (
               <Comments templateId={id} />
            )}
            {selectedTab === 'Answers' && isCreator && (
               <Answers />
            )}
        </main>
    );
};

export default CreateFormPage;