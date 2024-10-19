import { Request, Response } from 'express';
import Template from '../models/template';
import Comment from '../models/comment';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.body.template_id;
    const template = await Template.findByPk(templateId);
    if (!template) {
      res.status(404).json({ message: `Template not found ${req.body.template_id}` });
      return
    };

    const comment = await Comment.create({
      ...req.body,
      template_id: templateId,
    });
      res.status(201).json(comment);
  } catch (err: any) {
      res.status(400).json({ message: err.message });
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.params.id;
    const comments = await Comment.findAll({
      where: { template_id: templateId },
    });
    
    if (!comments) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    res.json(comments);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};