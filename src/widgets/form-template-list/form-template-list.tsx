import FormTemplateItem from "../form-template-item/form-template-item";

const FormTemplateList = ({title}: {title: string}) => {
    return (
        <section className="w-full mr-auto ml-auto flex flex-col pt-24">
            <h2 className="font-medium text-3xl text-center uppercase text-purple-700 font-mono pb-5">
                {title}
            </h2>
            <div className="flex flex-wrap w-full gap-10 justify-center">
                <FormTemplateItem/>
                <FormTemplateItem/>
                <FormTemplateItem/>
                <FormTemplateItem/>
                <FormTemplateItem/>
            </div>
        </section>
    );
}

export default FormTemplateList;