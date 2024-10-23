import { Request, Response } from 'express';
import Question from '../models/question';
import Template from '../models/template';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import BadRequestError from '../errors/bad-request-error';
import { CREATED, NOT_FOUND_ERROR_QUESTION_MESSAGE, NOT_FOUND_ERROR_TEMPLATE_MESSAGE } from '../utils/constants';

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
        const { template_id, ...questionData } = req.body;

        let question = await Question.findByPk(req.params.id);

        if (question) {
            await question.update(questionData);
            res.json(question);
        } else {
            const template = await Template.findByPk(template_id);

            if (!template) {
                throw new NotFoundError(NOT_FOUND_ERROR_TEMPLATE_MESSAGE);
            }

            question = await Question.create({
                ...questionData,
                template_id,
            });

            res.status(CREATED).json(question);
        }
    } catch (err: any) {
        console.error('Error updating or creating question:', err);
        throw new BadRequestError(err.message);
    }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question = await Question.findByPk(req.params.id);
      if (!question)  {
        throw new NotFoundError(NOT_FOUND_ERROR_QUESTION_MESSAGE)
    };
  
      await question.destroy();
        res.json({ message: 'Question deleted' });
    } catch (err: any) {
        throw new InternalServerError(err.message)
    }
};