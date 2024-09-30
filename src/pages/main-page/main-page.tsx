import React from "react";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";

const MainPage = () => {
    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24">
            <section className="flex flex-col text-center items-center gap-5">
                <h1 className="m-0 p-0 font-mono text-4xl">
                    Welcome to <span className="text-green-500">FormLab</span> – Your Customizable Form Builder
                </h1>
                <p className="font-mono w-9/12">
                    Create quizzes, surveys, polls, and more with ease! Whether you’re collecting feedback, conducting tests, or gathering data through questionnaires, FormLab empowers you to build fully customizable forms tailored to your needs.
                </p>
            </section>
            <FormTemplateList title='New Templates'/>
            <FormTemplateList title='Most Popular Templates' />
        </main>
    )
}

export default MainPage;