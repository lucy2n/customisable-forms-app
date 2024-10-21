import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { IUser } from "../../entities/user/model/user";
import trash from '../../assets/icons8-trash.svg';
import admin from '../../assets/icons8-admin-32.png';
import lock from '../../assets/icons8-lock.svg';
import { deleteUser, updateUser } from "../../shared/api/user";
import { setIsAdmin } from "../../entities/user/model/userSlice";
import { useAppDispatch } from "../../app/routes/lib/hook";

const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const AdminPanel = ({ users, refresh }: { users: IUser[], refresh: () => void }) => {
    const dispatch = useAppDispatch();

    const handleDelete = (id: number) => {
        deleteUser(id)
        .then(() => refresh());
    }

    const handleUpdateStatus = (id: number, user: IUser) => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        updateUser(id, { status: newStatus })
        .then(() => refresh());
    }

    const handleUpdateRole = (id: number, user: IUser) => {
        const newRole = user.is_admin ? false : true; // Toggle role
        updateUser(id, { is_admin: newRole })
            .then(() => {
                dispatch(setIsAdmin(!user.is_admin))
                refresh();
                
            });
    }

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize">{user.is_admin ? 'admin' : 'user'}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip content={user.is_admin ? "Revoke admin" : "Make admin"}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleUpdateRole(user.id ,user)}>
                                <img src={admin} alt="toggle admin" />
                            </span>
                        </Tooltip>
                        <Tooltip content={user.status === 'active' ? "Block admin" : "Unblock admin"}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <img src={lock} alt="lock user" onClick={() => handleUpdateStatus(user.id ,user)}/>
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(user.id)}>
                                <img src={trash} alt="delete user" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(user) => (
                    <TableRow key={user.email}>
                        {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default AdminPanel;