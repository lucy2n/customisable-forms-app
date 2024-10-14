export interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string,
    is_admin?: boolean
}

export interface IToken {
    auth_token: string;
}