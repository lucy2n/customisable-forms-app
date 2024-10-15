import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from "../controllers/template";

const router = Router();

router.post('/templates', createTemplate);
router.put('/templates/:id', updateTemplate);
router.delete('/templates/:id', deleteTemplate);

export default router;