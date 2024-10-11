import { Router } from "express";
import { createForm, deleteForm, getForms } from "../controllers/form";

const router = Router();

router.get('/forms', getForms);
router.post('/forms', createForm);
router.delete('/forms/:id', deleteForm);

export default router;