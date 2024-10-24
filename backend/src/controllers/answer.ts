import { Request, Response, NextFunction } from 'express';
import Form from '../models/form';
import Answer from '../models/answer';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import { CREATED, NOT_FOUND_ERROR_FORM_MESSAGE, NOT_FOUND_ERROR_TEMPLATE_MESSAGE } from '../utils/constants';

export const createAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const formId = req.body.form_id;
    const form = await Form.findByPk(formId);
    if (!form) {
      throw new NotFoundError(NOT_FOUND_ERROR_FORM_MESSAGE)
    };

    const answer = await Answer.create({
      ...req.body
    });
      res.status(CREATED).json(answer);
  } catch (err: any) {next(err)}
};

export const getAnswers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const templateId = req.params.id;
    const answers = await Answer.findAll({
      where: { template_id: templateId },
    });
    
    if (!answers) {
      throw new NotFoundError(NOT_FOUND_ERROR_TEMPLATE_MESSAGE)
    }

    res.json(answers);
  } catch (err: any) {next(err)}
};