import { Request, Response, NextFunction } from 'express';
import Form from '../models/form';
import Answer from '../models/answer';

export const createAnswer = async (req: Request, res: Response): Promise<void> => {
  try {
    const formId = req.body.form_id;
    const form = await Form.findByPk(formId);
    if (!form) {
      res.status(404).json({ message: `Form not found ${formId}` });
      return
    };

    const answer = await Answer.create({
      ...req.body
    });
      res.status(201).json(answer);
  } catch (err: any) {
      res.status(400).json({ message: err.message });
  }
};

export const getAnswers = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.params.id;
    const answers = await Answer.findAll({
      where: { template_id: templateId },
    });
    
    if (!answers) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    res.json(answers);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};