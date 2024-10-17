import { Request, Response, NextFunction } from 'express';
import Answer from '../models/answer';

export const createAnswers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { answers } = req.body;

    // if (!Array.isArray(answers)) {
    //   res.status(400).json({ message: 'Invalid data format. Expected an array of answers.' });
    // }

    const validAnswers = answers.map((answer: any) => {
      if (!answer.question_id || !answer.user_id || !answer.answer) {
        throw new Error('Each answer must contain question_id, user_id, and answer fields.');
      }

      return {
        id: answer.id,
        form_id: answer.form_id,
        question_id: answer.question_id,
        user_id: answer.user_id,
        answer: answer.answer,
      };
    });

    const createdAnswers = await Answer.bulkCreate(validAnswers);
    res.status(201).json(createdAnswers);
  } catch (err) {
    next(err); // Passes error to the error handling middleware
  }
};