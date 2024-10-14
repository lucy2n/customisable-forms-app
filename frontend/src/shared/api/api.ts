import { IUser } from "../../entities/user/model/user";
import { base_url } from "./constants";


export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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
  try {
    const res = await fetch(`${base_url}/users/me/`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    });

    console.log(res)

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.statusText}`);
    }

    return checkResponse<IUser>(res);
  } catch (err) {
    console.error('Ошибка получения данных пользователя:', err.message);
    throw err;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  console.log('Вы вышли из системы');
};

  