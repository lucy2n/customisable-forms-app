import { Router } from "express";
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controllers/question";

const router = Router();

router.get('/questions/:id', getQuestions);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

export default router;