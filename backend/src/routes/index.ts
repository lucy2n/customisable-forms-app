import { Router } from "express";
import userRouter from './user';
import answerRouter from './answer';
import questionRouter from './question';
import templateRouter from './template';
import formRouter from './form';
import commentRouter from './comment';
import { createUser, login } from "../controllers/user";
import auth from "../middlewares/auth";
import { getTemplates, getTemplatesByUser } from "../controllers/template";

const router = Router();

router.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
});

router.post('/signup', createUser);
router.post('/signin', login);

router.get('/templates', getTemplates);

router.use(auth);

router.get('/users/:user_id/templates', getTemplatesByUser);
router.use('/users', userRouter);
router.use('/template', templateRouter);
router.use('/forms', formRouter);
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/comments', commentRouter);

export default router;
