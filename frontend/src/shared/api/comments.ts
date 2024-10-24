import { IComment } from "../../entities/comment/model/comment";
import { checkResponse, getToken } from "./api";
import { base_url } from "./constants";

export const createComment = async (comment: IComment) => {
  const token = getToken();

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

  const res = await fetch(`${base_url}/comments/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
  
  return res.json();
};

