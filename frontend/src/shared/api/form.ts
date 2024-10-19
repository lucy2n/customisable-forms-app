import { IForm } from "../../entities/form/form";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const createForm = async (form: IForm) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/forms/create/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form),
      credentials: 'include',
    });
    return checkResponse<IForm>(res);
};