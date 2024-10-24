import { Request, Response } from 'express';
import Template from '../models/template';
import { IUserRequest } from '../types';
import UnauthorizedError from '../errors/unauthorized-err';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import { CREATED, FORBIDDEN_ERROR_USER, NOT_FOUND_ERROR_TEMPLATE_MESSAGE, UNAUTHORIZED_ERROR_USER_MESSAGE } from '../utils/constants';
import sequelize, { Op } from 'sequelize';
import Form from '../models/form';

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

export const getTemplatesByMostForms = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await Template.findAll({
      include: [
        {
          model: Form,
          as: 'forms',
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('forms.id')), 'formCount'],
        ],
      },
      group: ['Template.id'],
      order: [[sequelize.literal('formCount'), 'DESC']],
    });

    res.json(templates);
  } catch (err: any) {
    console.error('Error fetching templates by most forms:', err.message);
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

export const searchTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;

    // Проверка, был ли передан параметр q и является ли он строкой
    if (!q || typeof q !== 'string') {
      res.json([]); // Возвращаем пустой массив, если q отсутствует
    }

    const searchQuery = q?.toString().toLowerCase();

    const templates = await Template.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${searchQuery}%`, // Поиск в заголовке
            },
          },
          {
            description: {
              [Op.like]: `%${searchQuery}%`, // Поиск в описании
            },
          },
        ],
      },
    });

    // Возвращаем найденные шаблоны
    res.json(templates);
  } catch (err: any) {
    console.error('Error searching templates:', err.message);
    res.status(500).json({ message: 'Internal server error' });
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

    if (template.user_id !== req.user.id && !req.user.is_admin) {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER);
    }

    await template.update(req.body);
    res.json(template);
  } catch (err: any) {
    throw new BadRequestError(err.message);
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

    if (template.user_id !== req.user.id && !req.user.is_admin) {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER);
    }

    await template.destroy();
    res.json({ message: 'Template deleted successfully' });
  } catch (err: any) {
    console.error('Delete template error:', err.message);
    throw new InternalServerError(err.message);
  }
};