import { Router } from "express";
import userRouter from './user';
import answerRouter from './answer';
import questionRouter from './question';
import templateRouter from './template';
import formRouter from './form';
import commentRouter from './comment';
import saleforceRouter from './saleforce';
import jiraRouter from './jira';
import likeRouter from './like';
import { createUser, login } from "../controllers/user";
import auth from "../middlewares/auth";
import { getLatestTemplates, getTemplate, getTemplates, getTemplatesByMostForms, getTemplatesByUser } from "../controllers/template";
import { getLikes } from "../controllers/like";
import { getQuestions } from "../controllers/question";
import { getComments } from "../controllers/comment";

const router = Router();

router.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
});

router.post('/signup', createUser);
router.post('/signin', login);

router.get('/templates/latest', getLatestTemplates);
router.get('/templates/most-popular', getTemplatesByMostForms);
router.get('/templates', getTemplates);
router.get('/templates/:id', getTemplate);
router.get('/questions/:id', getQuestions);
router.get('/likes/:id', getLikes);
router.get('/comments/:id', getComments);

router.use(auth);

router.get('/users/:user_id/templates', getTemplatesByUser);
router.use('/users', userRouter);
router.use('/templates', templateRouter);
router.use('/forms', formRouter);
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);
router.use('/salesforce', saleforceRouter);
router.use('/jira', jiraRouter);

export default router;
