import { Request, Response } from 'express';
import InternalServerError from '../errors/internal-server-error';
import { createAccountAndContact } from '../services/saleforceService';

export const createSaleforceAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const result = await createAccountAndContact({ firstName, lastName, email, phone });
        res.status(201).json(result);
    } catch (err: any) {
        throw new InternalServerError(err.message);
    }
};