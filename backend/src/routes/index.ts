import { Router } from "express";
import userRouter from './user';
import questionRouter from './question';
import templateRouter from './template';
import formRouter from './form';
import { createUser, login } from "../controllers/user";
import auth from "../middlewares/auth";

const router = Router();

router.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
});

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/template', templateRouter);
router.use('/forms', formRouter);
router.use('/questions', questionRouter);

export default router;
