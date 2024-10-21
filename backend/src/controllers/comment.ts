import { Request, Response } from 'express';
import Template from '../models/template';
import Comment from '../models/comment';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import BadRequestError from '../errors/bad-request-error';
import { CREATED, NOT_FOUND_ERROR_COMMENTS_MESSAGE, NOT_FOUND_ERROR_TEMPLATE_MESSAGE } from '../utils/constants';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.body.template_id;
    const template = await Template.findByPk(templateId);
    if (!template) {
        throw new NotFoundError(NOT_FOUND_ERROR_TEMPLATE_MESSAGE)
    };

    const comment = await Comment.create({
      ...req.body,
      template_id: templateId,
    });
      res.status(CREATED).json(comment);
  } catch (err: any) {
      throw new BadRequestError(err.message)
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.params.id;
    const comments = await Comment.findAll({
      where: { template_id: templateId },
    });
    
    if (!comments) {
        throw new NotFoundError(NOT_FOUND_ERROR_COMMENTS_MESSAGE)
    }

    res.json(comments);
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};