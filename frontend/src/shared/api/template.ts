import { ITemplate } from "../../entities/template/model/template";
import { checkResponse } from "./api";
import { base_url } from "./constants";

export const createTemplate = async (template: ITemplate) => {
    const res = await fetch(`${base_url}/templates/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(template),
      credentials: 'include',
    });
    return checkResponse<ITemplate>(res);
};
