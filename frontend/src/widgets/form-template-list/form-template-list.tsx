import { FC } from "react";
import { ITemplate } from "../../entities/template/model/template";
import FormTemplateItem from "../form-template-item/form-template-item";
import FormTemplateItemSkeleton from "../form-template-item/ui/form-template-item-skeleton";

interface IFormTemplateList {
    title: string;
    templates: ITemplate[];
    refresh: () => void;
    loading: boolean;
}

const FormTemplateList: FC<IFormTemplateList> = ({ title, templates, refresh, loading }) => {
    if (!templates || templates.length === 0) {
        return <div>No templates found</div>;
    }

    return (
        <section className="w-full mr-auto ml-auto flex flex-col items-center pt-24">
            <h2 className="font-medium text-3xl text-center uppercase text-purple-700 font-mono pb-5">
                {title}
            </h2>
            <div className="flex flex-wrap w-full gap-10 justify-center max-w-screen-xl">
                {
                    loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <FormTemplateItemSkeleton key={index} />
                        ))
                    ) : (
                        templates.map((template) => (
                            <FormTemplateItem refresh={refresh} template={template} key={template.id} />
                        ))
                    )
                }
            </div>
        </section>
    );
};

export default FormTemplateList;