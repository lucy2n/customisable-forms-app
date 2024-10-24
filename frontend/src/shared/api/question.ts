import { IQuestion } from "../../entities/question/model/question";
import { checkResponse, getToken } from "./api";
import { base_url } from "./constants";

export const createQuestion = async (question: IQuestion) => {
    const token = getToken();

    const res = await fetch(`${base_url}/questions/create/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(question),
      credentials: 'include',
    });
    return checkResponse<IQuestion>(res);
};

export const getQuestions = async (id: string) => {
    const res = await fetch(`${base_url}/questions/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    
    return checkResponse<IQuestion[]>(res);
};

export const updateQuestion = async (questionId: string, updatedFields: Partial<IQuestion>) => {
  const token = getToken();

  const res = await fetch(`${base_url}/questions/update/${questionId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedFields),
    credentials: 'include',
  });

  return checkResponse<IQuestion>(res);
};

export const deleteQuestion = async (questionId: string) => {
  const token = getToken();

  const res = await fetch(`${base_url}/questions/delete/${questionId}`, {
      method: 'DELETE',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
      },
  });

  if (!res.ok) {
      throw new Error('Failed to delete question');
  }

  return res.json();
};