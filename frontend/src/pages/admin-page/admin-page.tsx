import { useEffect, useState } from "react";
import AdminPanel from "../../features/admin-panel/admin-panel";
import { IUser } from "../../entities/user/model/user";
import { getUsers } from "../../shared/api/user";

const AdminPage = () => {
    const [users, setUsers] = useState<IUser[]>();

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        getUsers()
            .then(res => setUsers(res))
            .catch(err => console.log(err))
    };

    if (!users) {
        return <p>Loading...</p>
    }


    return (
        <main className="flex flex-col justify-between w-11/12 mr-auto ml-auto pt-24">
            <AdminPanel users={users} refresh={refresh}/>
        </main>
    );
};

export default AdminPage;