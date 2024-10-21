import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplate, getTemplates, updateTemplate } from "../controllers/template";

const router = Router();

router.post('/create', createTemplate);
router.get('/:id', getTemplate);
router.put('/update/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;