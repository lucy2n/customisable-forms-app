import { FC } from "react";
import { ITemplate } from "../../entities/template/model/template";
import FormTemplateItem from "../form-template-item/form-template-item";

interface IFormTemplateList {
    title: string,
    templates: ITemplate[],
    refresh: () => void
}

const FormTemplateList:FC<IFormTemplateList> = ({title, templates, refresh}) => {
    return (
        <section className="w-full mr-auto ml-auto flex flex-col pt-24">
            <h2 className="font-medium text-3xl text-center uppercase text-purple-700 font-mono pb-5">
                {title}
            </h2>
            <div className="flex flex-wrap w-full gap-10 justify-center">
                {
                    templates.map((template) => (
                        <FormTemplateItem refresh={refresh} template={template} key={template.id}/>
                    ))
                }
            </div>
        </section>
    );
}

export default FormTemplateList;