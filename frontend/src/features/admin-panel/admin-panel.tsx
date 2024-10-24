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
    const user = useAppSelector((store: RootState) => store.user);

    const handleDelete = (id: number | undefined) => {
      if (id !== undefined) {
        deleteUser(id)
          .then(() => refresh());
      } else {
        console.error('ID is undefined');
      }
    };

    const handleUpdateStatus = (id: number | undefined, user: IUser) => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        if (id !== undefined) {
          updateUser(id, { status: newStatus })
          .then(() => refresh());
        } else {
          console.error('ID is undefined');
        }
    }

    const handleUpdateRole = (id: number | undefined, user: IUser) => {
        const newRole = user.is_admin ? false : true;
        if (id !== undefined) {
        updateUser(id, { is_admin: newRole })
            .then(() => {
                dispatch(setIsAdmin(!user.is_admin))
                refresh();
                
            });
        } else {
            console.error('ID is undefined');
        }
    }

    const renderCell = React.useCallback((u: IUser, columnKey: string) => {
      switch (columnKey) {
          case "name":
              return (
                  <User description={u.email} name={u.name}>
                      {u.email}
                  </User>
              );
          case "role":
              return (
                  <div className="flex flex-col">
                      <p className="text-bold text-sm capitalize">{u.is_admin ? 'admin' : 'user'}</p>
                  </div>
              );
          case "status":
              return (
                  <Chip className="capitalize" color={u.status === 'active' ? 'success' : 'danger'} size="sm" variant="flat">
                      {u.status}
                  </Chip>
              );
          case "actions":
              return (
                  <div className="relative flex justify-center items-center gap-2">
                      <Tooltip content={u.is_admin ? "Revoke admin" : "Make admin"}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleUpdateRole(+user.id, u)}>
                              <img src={admin} alt="toggle admin" />
                          </span>
                      </Tooltip>
                      <Tooltip content={u.status === 'active' ? "Block user" : "Unblock user"}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <img src={lock} alt="lock user" onClick={() => handleUpdateStatus(+user.id, u)} />
                          </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete user">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(+user.id)}>
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