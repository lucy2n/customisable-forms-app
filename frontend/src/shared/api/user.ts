import { IUser } from "../../entities/user/model/user";
import { checkResponse, getToken } from "./api";
import { base_url } from "./constants";

export const createUser = async (user: IUser) => {
  const res = await fetch(`${base_url}/signup/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });
  return checkResponse<IUser>(res);
};

export const loginUser = async (email: string, password: string): Promise<{ token: string, user: IUser }> => {
  const res = await fetch(`${base_url}/signin/`, {
  method: 'POST',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({ email, password }),
  });

  const data = await checkResponse<{ token: string, user: IUser }>(res);

  localStorage.setItem('token', data.token);

  return data;
};

export const getUserInformation = async () => {
  const token = getToken();

  const res = await fetch(`${base_url}/users/me/`, {
      method: 'GET',
      headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
  });

  if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
  }

    return res.json();
};

export const getUsers = async () => {
  const token = getToken();

  const res = await fetch(`${base_url}/users/`, {
      method: 'GET',
      headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
  });

  if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
  }

  return res.json();
};

export const updateUser = async (userId: number, updatedFields: Partial<IUser>) => {
  const token = getToken();

  const res = await fetch(`${base_url}/users/${userId}/`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedFields),
    credentials: 'include',
  });

  return checkResponse<IUser>(res);
};

export const deleteUser = async (userId: number) => {
  const token = getToken();

  const res = await fetch(`${base_url}/users/${userId}/`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include',
  });

  return checkResponse<IUser>(res);
};

export const logout = () => {
  localStorage.removeItem('token');
  console.log('Вы вышли из системы');
};

  