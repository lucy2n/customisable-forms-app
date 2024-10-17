import { Request, Response, NextFunction } from 'express';
import Form from '../models/form';
import Answer from '../models/answer';

export const createAnswer = async (req: Request, res: Response): Promise<void> => {
  try {
    const formId = req.body.form_id;
    const form = await Form.findByPk(formId);
    if (!form) {
      res.status(404).json({ message: `Form not found ${req.body.form_id}` });
      return
    };

    const answer = await Answer.create({
      ...req.body,
      form_id: formId,
    });
      res.status(201).json(answer);
  } catch (err: any) {
      res.status(400).json({ message: err.message });
  }
};