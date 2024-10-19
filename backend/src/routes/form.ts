import { Router } from "express";
import { createForm, deleteForm, getForms } from "../controllers/form";

const router = Router();

router.get('/', getForms);
router.post('/create', createForm);
router.delete('/delete/:id', deleteForm);

export default router;