import { IAnswer } from "../../entities/answer/model/answer";
import { checkResponse, getToken } from "./api";
import { base_url } from "./constants";

export const createAnswer = async (answer: IAnswer) => {
  const token = getToken();

  const res = await fetch(`${base_url}/answers/create/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(answer),
    credentials: 'include',
  });
  return checkResponse<IAnswer>(res);
};


export const getAnswers = async (id: string) => {
  const token = getToken();

  const res = await fetch(`${base_url}/answers/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  
  return checkResponse<IAnswer[]>(res);
};