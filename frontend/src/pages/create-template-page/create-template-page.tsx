import TemplateBuilder from "../../features/template-builder/template-builder";

const CreateTemplatePage = () => {
    return (
        <main className="flex flex-col justify-between w-full md:w-11/12 lg:w-11/12 mr-auto ml-auto pt-24 max-w-screen-xl">
            <TemplateBuilder />
        </main>
    )
}

export default CreateTemplatePage;