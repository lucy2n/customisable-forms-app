import { Router } from "express";
import { createTemplate, deleteTemplate, updateTemplate } from "../controllers/template";

const router = Router();

router.post('/create', createTemplate);
router.put('/update/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;