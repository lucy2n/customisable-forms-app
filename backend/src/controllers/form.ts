import { Request, Response } from 'express';
import Form from '../models/form';
import Template from '../models/template';
import User from '../models/user';
import { IUserRequest } from '../types';
import UnauthorizedError from '../errors/unauthorized-err';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import BadRequestError from '../errors/bad-request-error';
import { CREATED, NOT_FOUND_ERROR_FORM_MESSAGE, NOT_FOUND_ERROR_TEMPLATE_MESSAGE, REQUEST_OK, UNAUTHORIZED_ERROR_USER_MESSAGE } from '../utils/constants';

export const getForms = async (req: Request, res: Response): Promise<void> => {
  try {
    const forms = await Form.findAll({
      where: { template_id: req.params.templateId },
      include: User,
    });

    if (!forms || forms.length === 0) {
      throw new NotFoundError(NOT_FOUND_ERROR_FORM_MESSAGE)
    }

    res.status(REQUEST_OK).json(forms);
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};

export const createForm = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.body.template_id);

    if (!template) {
      throw new NotFoundError(NOT_FOUND_ERROR_TEMPLATE_MESSAGE)
    }

    if (!req.user) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_USER_MESSAGE);
    }

    const form = await Form.create({
      ...req.body
    });

    res.status(CREATED).json(form);
  } catch (err: any) {
    throw new BadRequestError(err.message)
  }
};

export const deleteForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      throw new NotFoundError(NOT_FOUND_ERROR_FORM_MESSAGE)
    }

    await form.destroy();
    res.status(REQUEST_OK).json({ message: 'Form deleted successfully' });
  } catch (err: any) {
      throw new InternalServerError(err.message)
  }
};