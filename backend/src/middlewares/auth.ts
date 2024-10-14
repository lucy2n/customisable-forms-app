import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUserRequest } from '../types';

interface JwtPayload {
  id: number
}

const auth = (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.jwt || req.headers.authorization;
    if (!token) {
      throw new Error('Токен не передан');
    }
    token = token.replace('Bearer ', '');
    let payload: JwtPayload | null = null;

    payload = jwt.verify(token, 'JWT_SECRET') as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new Error('Необходима авторизация'));
  }
};

export default auth;