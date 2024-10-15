import { IQuestion } from "../../entities/question/model/question";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const createQuestion = async (question: IQuestion) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Токен не найден');
    }

    const res = await fetch(`${base_url}/questions/questions/`, {
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