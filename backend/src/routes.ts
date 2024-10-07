import { Router, Request, Response } from 'express';
import { createUser, deleteUser, getUsers, updateUser } from './controllers/user';
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from './controllers/template';
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from './controllers/question';
import { createForm, deleteForm, getForms } from './controllers/form';

const router = Router();

// User routes
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Template routes
router.get('/templates', getTemplates);
router.post('/templates', createTemplate);
router.put('/templates/:id', updateTemplate);
router.delete('/templates/:id', deleteTemplate);

// Question routes
router.get('/templates/:templateId/questions', getQuestions);
router.post('/templates/:templateId/questions', createQuestion)
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

// Form routes
router.get('/templates/:templateId/forms', getForms);
router.post('/templates/:templateId/forms', createForm);
router.delete('/forms/:id', deleteForm);

export default router;