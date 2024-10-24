import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { IUser } from "../../entities/user/model/user";
import trash from '../../assets/icons8-trash.svg';
import admin from '../../assets/icons8-admin-32.png';
import lock from '../../assets/icons8-lock.svg';
import { deleteUser, updateUser } from "../../shared/api/user";
import { setIsAdmin } from "../../entities/user/model/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/routes/lib/hook";
import { RootState } from "../../app/appStore";

const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];


const AdminPanel = ({ users, refresh }: { users: IUser[], refresh: () => void }) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((store: RootState) => store.user);

    const handleDelete = (id: number | undefined) => {
      if (id !== undefined) {
        deleteUser(id)
          .then(() => refresh());
      } else {
        console.error('ID is undefined');
      }
    };

    const handleUpdateStatus = (user: IUser) => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        if (user.id !== undefined) {
          updateUser(user.id, { status: newStatus })
          .then(() => refresh());
        } else {
          console.error('ID is undefined');
        }
    }

    const handleUpdateRole = (user: IUser) => {
        const newRole = !user.is_admin;
    
        if (user.id !== undefined) {
            updateUser(user.id, { is_admin: newRole })
                .then(() => {
                    if (currentUser.id !== undefined && String(currentUser.id) === String(user.id)) {
                        dispatch(setIsAdmin(newRole));
                    }
                    refresh();
                });
        } else {
            console.error('ID is undefined');
        }
    };


    const renderCell = React.useCallback((user: IUser, columnKey: string) => {
      switch (columnKey) {
          case "name":
              return (
                  <User description={user.email} name={user.name}>
                      {user.email}
                  </User>
              );
          case "role":
              return (
                  <div className="flex flex-col">
                      <p className="text-bold text-sm capitalize">{user.is_admin ? 'admin' : 'user'}</p>
                  </div>
              );
          case "status":
              return (
                  <Chip className="capitalize" color={user.status === 'active' ? 'success' : 'danger'} size="sm" variant="flat">
                      {user.status}
                  </Chip>
              );
          case "actions":
              return (
                  <div className="relative flex justify-center items-center gap-2">
                      <Tooltip content={user.is_admin ? "Revoke admin" : "Make admin"}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleUpdateRole(user)}>
                              <img src={admin} alt="toggle admin" />
                          </span>
                      </Tooltip>
                      <Tooltip content={user.status === 'active' ? "Block user" : "Unblock user"}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <img src={lock} alt="lock user" onClick={() => handleUpdateStatus(user)} />
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
              return null;
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
                        {(columnKey) => <TableCell>{renderCell(user, columnKey + '')}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default AdminPanel;