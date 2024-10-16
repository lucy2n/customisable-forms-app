import { Request, Response } from 'express';
import Question from '../models/question';
import Template from '../models/template';
import Form from '../models/form';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const templateId = req.params.id;

    const template = await Template.findOne({
      where: { id: templateId },
      include: [{ model: Question, as: 'questions' }]
    });

    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    res.json(template.questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const templateId = req.body.template_id;
      const template = await Template.findByPk(templateId);
      if (!template) {
        res.status(404).json({ message: `Template not found ${req.body.template_id}` });
        return
      };
  
      const question = await Question.create({
        ...req.body,
        template_id: templateId,
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