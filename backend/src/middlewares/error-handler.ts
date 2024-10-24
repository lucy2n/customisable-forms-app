import { Request, Response, NextFunction } from 'express';
import { SERVER_ERROR } from '../utils/constants';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
import UnauthorizedError from '../errors/unauthorized-err';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof BadRequestError) {
        return res.status(400).json({ message: err.message });
    }
    
    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }

    if (err instanceof ForbiddenError) {
        return res.status(403).json({ message: err.message });
    }

    if (err instanceof UnauthorizedError) {
        return res.status(401).json({ message: err.message });
    }

    return res.status(SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorHandler;