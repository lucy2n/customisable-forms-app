import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUserRequest } from '../types';

interface JwtPayload {
  id: number;
}

const auth = (req: IUserRequest, res: Response, next: NextFunction): void => {
  try {
    let token = req.cookies.jwt || req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ message: 'Токен не передан' });
    }

    token = token.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JwtPayload;
    
    req.user = payload;
    next(); // Передаем управление следующему middleware
  } catch (e: any) {
    res.status(401).json({ message: 'Необходима авторизация' });
  }
};

export default auth;