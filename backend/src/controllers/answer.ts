import { Request, Response, NextFunction } from 'express';
import Answer from '../models/answer';

export const createAnswers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      res.status(400).json({ message: 'Invalid data format. Expected an array of answers.' });
      return;
    }

    // if (!form_id) {
    //   res.status(400).json({ message: 'form_id is required.' });
    //   return;
    // }

    const validAnswers = answers.map((answer: any) => {
      if (!answer.question_id || !answer.user_id || !answer.answer) {
        throw new Error('Each answer must contain question_id, user_id, and answer fields.');
      }

      return {
        form_id: answer.form_id,
        question_id: answer.question_id,
        user_id: answer.user_id,
        answer: answer.answer,
      };
    });

    // bulkCreate автоматически сгенерирует id для каждого ответа
    const createdAnswers = await Answer.bulkCreate(validAnswers);
    res.status(201).json(createdAnswers);
  } catch (err) {
    next(err);
  }
};