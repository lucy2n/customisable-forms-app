import { ILike } from "../../entities/like/model/like";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const addLike = async (templateId: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/likes/add/${templateId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ templateId }),
      credentials: 'include',
    });

    return checkResponse<ILike>(res);
};

export const removeLike = async (templateId: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/likes/remove/${templateId}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ templateId }),
      credentials: 'include',
    });

    return checkResponse<ILike>(res);
};