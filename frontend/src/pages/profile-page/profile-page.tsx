import { useEffect, useState } from "react";
import FormTemplateList from "../../widgets/form-template-list/form-template-list";
import { ITemplate } from "../../entities/template/model/template";
import { getTemplatesByUser } from "../../shared/api/template";
import { useAppSelector } from "../../app/routes/lib/hook";


const ProfilePage = () => {
    const user = useAppSelector(state => state.user);
    const [templates, setTemplates] = useState<ITemplate[]>();

    useEffect(() => {
        getTemplatesByUser(user.id)
        .then(res => setTemplates(res))
        .catch(err => console.log(err))
    }, [user.id])

    return (
        <main className="flex items-center w-11/12 mr-auto ml-auto pt-24">
            {templates && 
                <FormTemplateList templates={templates} title="My templates"/>
            }
        </main>
    )
}

export default ProfilePage;