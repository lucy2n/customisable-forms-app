import { Request, Response } from 'express';
import Template from '../models/template';
import { IUserRequest } from '../types';

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await Template.findAll();
    res.json(templates);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

export const getTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.params.id);
    res.json(template);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
       res.status(401).json({ message: 'Unauthorized' });
       return
    }

    const template = await Template.create({
      ...req.body,
      user_id: req.user?.id,
    });
      res.status(201).json(template);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Update a template
export const updateTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Authorization check
    if (template.user_id !== req.user.id) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    await template.update(req.body);
    res.json(template);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a template
export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    // if (!req.user) {
    //   res.status(401).json({ message: 'Unauthorized' });
    //   return;
    // }

    // if (template.user_id !== req.user.id && !req.user.is_admin) {
    //   res.status(403).json({ message: 'Not authorized' });
    //   return;
    // }

    await template.destroy();
    res.json({ message: 'Template deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};