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
import { IAnswer } from "../../entities/answer/model/answer";
import { getAnswers } from "../../shared/api/answer";

const CreateFormPage = () => {
    const { id } = useParams();
    const [template, setTemplate] = useState<ITemplate>();
    const [questions, setQuestions] = useState<IQuestion[]>();
    const [answers, setAnswers] = useState<IAnswer[]>();
    const user = useAppSelector((store) => store.user);
    const [selectedTab, setSelectedTab] = useState<string>('Form');

    const updateTab = (tab: string) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        if (id) {
            const promises = [getTemplate(id), getQuestions(id)];

            // Если пользователь авторизован, добавляем запрос для получения ответов
            if (user?.id) {
                promises.push(getAnswers(id));
            }

            Promise.all(promises)
                .then(([templateRes, questionsRes, answersRes]) => {
                    setTemplate(templateRes);
                    setQuestions(questionsRes);

                    // Если пользователь авторизован, сохраняем ответы
                    if (answersRes) {
                        setAnswers(answersRes);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [id, user?.id]); // Добавляем зависимость от user.id

    if (!template || !questions || !id) {
        return <div>Loading...</div>;
    }

    // Проверяем, является ли пользователь создателем формы
    const isCreator = template.user_id + '' === user?.id;

    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-10 gap-10">
            <FormTabs updateTab={updateTab} isLogined={user?.isLoggedIn}/>
            {selectedTab === 'Form' && (
               <Form template={template} questions={questions} userId={+user?.id} />
            )}
            {selectedTab === 'Comments' && (
               <Comments templateId={id} userId={+user?.id}/>
            )}
            {selectedTab === 'Answers' && isCreator && answers && (
               <Answers answers={answers} questions={questions}/>
            )}
        </main>
    );
};

export default CreateFormPage;