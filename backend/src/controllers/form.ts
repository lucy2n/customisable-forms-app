import { Request, Response } from 'express';
import Form from '../models/form';
import Template from '../models/template';
import User from '../models/user';
import { IUserRequest } from '../types';

export const getForms = async (req: Request, res: Response): Promise<void> => {
  try {
    const forms = await Form.findAll({
      where: { template_id: req.params.templateId },
      include: User,
    });

    if (!forms || forms.length === 0) {
      res.status(404).json({ message: 'Forms not found for this template' });
      return;
    }

    res.status(200).json(forms);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createForm = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.params.templateId);

    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const form = await Form.create({
      ...req.body,
      template_id: req.params.templateId,
      user_id: req.user.id,
    });

    res.status(201).json(form);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    await form.destroy();
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};