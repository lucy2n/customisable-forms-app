export interface IUser {
    name: string;
    email: string;
    password: string;
    status: string;
    is_admin?: boolean;
}

export interface IToken {
    auth_token: string;
}