import { ITemplate } from "../../entities/template/model/template";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const getTemplates = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/templates/`, {
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

export const createTemplate = async (template: ITemplate) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/template/templates/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(template),
      credentials: 'include',
    });
    return checkResponse<ITemplate>(res);
};
