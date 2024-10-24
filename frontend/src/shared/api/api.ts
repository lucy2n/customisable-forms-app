export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getToken = (): string => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Токен не найден');
    }

    return token;
};