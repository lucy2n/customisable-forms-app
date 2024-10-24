import { ILike } from "../../entities/like/model/like";
import { checkResponse, getToken } from "./api";
import { base_url } from "./constants";

export const getLikes = async (id: string) => {  
  const res = await fetch(`${base_url}/likes/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
  
  return checkResponse<ILike[]>(res);
  };

export const addLike = async (like: ILike) => {
  const token = getToken();

  const res = await fetch(`${base_url}/likes/add/${like.template_id}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(like),
    credentials: 'include',
  });

  return checkResponse<ILike>(res);
};

export const removeLike = async (templateId: string) => {
  const token = getToken();

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