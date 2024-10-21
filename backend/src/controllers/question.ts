import { Request, Response } from 'express';
import Question from '../models/question';
import Template from '../models/template';
import Form from '../models/form';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import BadRequestError from '../errors/bad-request-error';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.params.id;
    const questions = await Question.findAll({
      where: { template_id: templateId },
    });
    
    if (!questions) {
      throw new NotFoundError('Template not found')
    }

    res.json(questions);
  } catch (err: any) {
    console.error('Error fetching questions:', err);
    throw new InternalServerError(err.message)
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const templateId = req.body.template_id;
      const template = await Template.findByPk(templateId);
      if (!template) {
        throw new NotFoundError(`Template not found ${req.body.template_id}`)
      };
  
      const question = await Question.create({
        ...req.body,
        template_id: templateId,
      });
        res.status(201).json(question);
    } catch (err: any) {
      throw new BadRequestError(err.message)
    }
};

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question = await Question.findByPk(req.params.id);
      if (!question)  {
        throw new NotFoundError('Question not found')
      };
  
      await question.update(req.body);
        res.json(question);
    } catch (err: any) {
        throw new BadRequestError(err.message)
    }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question = await Question.findByPk(req.params.id);
      if (!question)  {
        throw new NotFoundError('Question not found')
    };
  
      await question.destroy();
        res.json({ message: 'Question deleted' });
    } catch (err: any) {
        throw new InternalServerError(err.message)
    }
};