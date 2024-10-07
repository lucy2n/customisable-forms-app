import { Request, Response } from 'express';
import Question from '../models/question';
import Template from '../models/template';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await Question.findAll({
      where: { template_id: req.params.templateId },
    });
    res.json(questions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const template = await Template.findByPk(req.params.templateId);
      if (!template) {
        res.status(404).json({ message: 'Template not found' });
        return
    };
  
      const question = await Question.create({
        ...req.body,
        template_id: req.params.templateId,
      });
        res.status(201).json(question);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question = await Question.findByPk(req.params.id);
      if (!question)  {
        res.status(404).json({ message: 'Question not found' });
        return
      };
  
      await question.update(req.body);
        res.json(question);
    } catch (err: any) {
       res.status(400).json({ message: err.message });
    }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question = await Question.findByPk(req.params.id);
      if (!question)  {
        res.status(404).json({ message: 'Question not found' });
        return
    };
  
      await question.destroy();
        res.json({ message: 'Question deleted' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};