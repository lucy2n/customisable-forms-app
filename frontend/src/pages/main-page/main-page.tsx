import { motion } from "framer-motion";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";
import { useEffect, useState } from "react";
import { ITemplate } from "../../entities/template/model/template";
import { getLatestTemplates, getMostPopularTemplates, getTemplates } from "../../shared/api/template";
import { useAppSelector } from "../../app/routes/lib/hook";
import { RootState } from "../../app/appStore";
import SearchTemplates from "../../features/search-templates/ui/search-templates";

const MainPage = () => {
    const [templates, setTemplates] = useState<ITemplate[]>([]);
    const [searchTemplates, setSearchTemplates] = useState<ITemplate[]>([]);
    const [latestTemplates, setLatestTemplates] = useState<ITemplate[]>([]);
    const [mostPopularTemplates, setMostPopularTemplates] = useState<ITemplate[]>([]);
    const [loading, setLoading] = useState<{ latest: boolean, popular: boolean }>({
        latest: true,
        popular: true
    });

    const { search } = useAppSelector((state: RootState) => state.searchByInputTemp);

    //TODO: Move search logic to back
    useEffect(() => {
        if (search) {
            setSearchTemplates(
                templates.filter(template =>
                    template.title.toLowerCase().includes(search.toLowerCase()) ||
                    template.description.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, templates]);

    useEffect(() => {
        refresh();
    }, []);

    const fetchTemplates = async () => {
        try {
            const [allTemplates, latest, popular] = await Promise.all([
                getTemplates(),
                getLatestTemplates(),
                getMostPopularTemplates()
            ]);

            setTemplates(allTemplates);
            setLatestTemplates(latest);
            setMostPopularTemplates(popular);
        } catch (error) {
            console.error("Error fetching templates:", error);
        } finally {
            setLoading({ latest: false, popular: false });
        }
    };

    const refresh = () => {
        setLoading({ latest: true, popular: true });
        fetchTemplates();
    };

    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24 bg-gradient max-w-screen-xl">
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
                    className="font-mono w-9/12 mb-10"
                >
                    Create quizzes, surveys, polls, and more with ease! Whether you’re collecting feedback, conducting tests, or gathering data through questionnaires, FormLab empowers you to build fully customizable forms tailored to your needs.
                </motion.p>
                <SearchTemplates />
            </section>
            {search && searchTemplates.length > 0 ? (
                <FormTemplateList 
                    title='Search Templates' 
                    templates={searchTemplates} 
                    refresh={refresh} 
                    loading={false}
                />
            ) : (
                <>
                    <FormTemplateList 
                        title='New Templates' 
                        templates={latestTemplates} 
                        refresh={refresh} 
                        loading={loading.latest}
                    />
                    <FormTemplateList 
                        title='Most Popular' 
                        templates={mostPopularTemplates.slice(0, 5)} 
                        refresh={refresh}
                        loading={loading.popular}
                    />
                </>
            )}
        </main>
    );
};

export default MainPage;
