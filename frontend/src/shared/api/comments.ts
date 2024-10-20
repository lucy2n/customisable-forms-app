import { IComment } from "../../entities/comment/model/comment";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const createComment = async (comment: IComment) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/comments/create/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(comment),
      credentials: 'include',
    });
    return checkResponse<IComment>(res);
};


export const getComments = async (id: string) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
      throw new Error('Токен не найден');
  }

  const res = await fetch(`${base_url}/comments/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  
  console.log(res)
  return res.json();
};

