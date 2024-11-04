import { IUserSalesforce } from "../../entities/user/model/user";
import { getToken } from "./api";
import { base_url } from "./constants";


export const createSalesforce = async (user: IUserSalesforce) => {
    const token = getToken();
    console.log(user, 'user')

    const res = await fetch(`${base_url}/salesforce/create/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user),
      credentials: 'include',
    });
    return res.json();
};