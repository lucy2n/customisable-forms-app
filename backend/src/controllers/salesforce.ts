import { NextFunction, Request, Response } from 'express';
import { createAccountAndContact } from '../services/saleforceService';
import { CREATED } from '../utils/constants';

export const createSaleforceAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const result = await createAccountAndContact({ firstName, lastName, email, phone });
        res.status(CREATED).json(result);
    } catch (err: any) {
        next(err)
    }
};