import { IAnswer } from "../../entities/answer/model/answer";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const createAnswers = async (answers: IAnswer[]) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/forms/forms/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(answers),
      credentials: 'include',
    });
    return checkResponse<IAnswer[]>(res);
};