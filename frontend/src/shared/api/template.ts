import { ITemplate } from "../../entities/template/model/template";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const getTemplates = async () => {

    const res = await fetch(`${base_url}/templates/`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });


    return res.json();
};

export const getTemplatesByUser = async (user_id: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/users/${user_id}/templates/`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        },
    });


    return res.json();
};

export const getTemplate = async (id: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/template/${id}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });


    return res.json();
};

export const deleteTemplate = async (id: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }
  
    const res = await fetch(`${base_url}/template/delete/${id}/`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
    });
  
    return checkResponse<ITemplate>(res);
  };


export const createTemplate = async (template: ITemplate) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/template/create/`, {
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

export const updateTemplate = async (templateId: string, updatedFields: Partial<ITemplate>) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/template/update/${templateId}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedFields),  // Передаем только обновленные поля
      credentials: 'include',
    });

    return checkResponse<ITemplate>(res);
};
