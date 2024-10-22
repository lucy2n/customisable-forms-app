import { Request, Response } from 'express';
import Template from '../models/template';
import { IUserRequest } from '../types';
import UnauthorizedError from '../errors/unauthorized-err';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import { CREATED, FORBIDDEN_ERROR_USER, NOT_FOUND_ERROR_TEMPLATE_MESSAGE, UNAUTHORIZED_ERROR_USER_MESSAGE } from '../utils/constants';
import Like from '../models/like';
import sequelize from 'sequelize';

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await Template.findAll();
    res.json(templates);
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};

export const getTemplatesByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;

    const templates = await Template.findAll({
      where: {
        user_id,
      },
    });

    res.json(templates);
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};

export const getLatestTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await Template.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json(templates);
  } catch (err: any) {
    throw new InternalServerError(err.message);
  }
};

export const getMostLikedTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await Template.findAll({
      include: [
        {
          model: Like,
          as: 'likes',
          attributes: [],
        }
      ],
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('likes.template_id')), 'likeCount']]
      },
      group: ['Template.id'],
      order: [[sequelize.literal('likeCount'), 'DESC']],
      limit: 5
    });

    // Возвращаем шаблоны вместе с количеством лайков
    res.json(templates);
  } catch (err: any) {
    console.error('Get most liked templates error:', err.message);
    throw new InternalServerError(err.message);
  }
};

export const getTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.params.id);
    res.json(template);
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};

export const createTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_USER_MESSAGE);
    }

    const template = await Template.create({
      ...req.body,
      user_id: req.user?.id,
    });
      res.status(CREATED).json(template);
  } catch (err: any) {
    throw new BadRequestError(err.message)
  }
};

export const updateTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      throw new NotFoundError(NOT_FOUND_ERROR_TEMPLATE_MESSAGE);
    }

    if (!req.user) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_USER_MESSAGE);
    }

    if (template.user_id !== req.user.id) {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER)
    }

    await template.update(req.body);
    res.json(template);
  } catch (err: any) {
    throw new BadRequestError(err.message)
  }
};

export const deleteTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id);

    if (!template) {
      throw new NotFoundError(NOT_FOUND_ERROR_TEMPLATE_MESSAGE);
    }

    if (!req.user) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_USER_MESSAGE);
    }


    if (template.user_id !== req.user.id) {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER);
    }

    await template.destroy();
    res.json({ message: 'Template deleted successfully' });
  } catch (err: any) {
    console.error('Delete template error:', err.message);
    throw new InternalServerError(err.message);
  }
};