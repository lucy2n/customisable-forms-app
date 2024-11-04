export interface IUser {
    id?: number,
    name: string;
    email: string;
    password: string;
    status: string;
    is_admin?: boolean;
    saleforce_id?: string;
}

export interface IUserSalesforce {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IToken {
    auth_token: string;
}