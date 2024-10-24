import { ITemplate } from "../../entities/template/model/template";
import { checkResponse, getToken } from "./api";
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

export const getLatestTemplates = async () => {
    const res = await fetch(`${base_url}/templates/latest`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });


    return res.json();
};

export const getMostPopularTemplates = async () => {
    const res = await fetch(`${base_url}/templates/most-popular`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });


    return res.json();
};

export const getTemplatesByUser = async (user_id: string) => {
    const token = getToken();

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
    const res = await fetch(`${base_url}/templates/${id}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });


    return res.json();
};

export const createTemplate = async (template: ITemplate) => {
    const token = getToken();

    const res = await fetch(`${base_url}/templates/create/`, {
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
    const token = getToken();

    const res = await fetch(`${base_url}/templates/update/${templateId}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedFields),
      credentials: 'include',
    });

    return checkResponse<ITemplate>(res);
};


export const deleteTemplate = async (templateId: string) => {
    const token = getToken();

    const res = await fetch(`${base_url}/templates/${templateId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    });

    return checkResponse<ITemplate>(res);
};

