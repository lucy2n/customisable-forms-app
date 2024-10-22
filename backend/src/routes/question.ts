import { Router } from "express";
import { createQuestion, deleteQuestion, updateQuestion } from "../controllers/question";

const router = Router();

router.post('/create', createQuestion);
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion);

export default router;