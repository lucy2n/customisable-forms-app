import { motion } from "framer-motion";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";

const MainPage = () => {
    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24 bg-gradient">
            <section className="flex flex-col text-center items-center gap-5">
                <motion.h1 
                    className="m-0 p-0 font-mono text-4xl"
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                >
                    Welcome to <span className="text-green-500">FormLab</span> – Your Customizable Form Builder
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                    className="font-mono w-9/12">
                    Create quizzes, surveys, polls, and more with ease! Whether you’re collecting feedback, conducting tests, or gathering data through questionnaires, FormLab empowers you to build fully customizable forms tailored to your needs.
                </motion.p>
            </section>
            <FormTemplateList title='New Templates'/>
            <FormTemplateList title='Most Popular Templates' />
        </main>
    );
}

export default MainPage;