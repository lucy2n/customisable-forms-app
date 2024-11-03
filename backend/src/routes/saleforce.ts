import { Router } from "express";
import { createSaleforceAccount } from "../controllers/salesforce";

const router = Router();

router.post('/create', createSaleforceAccount);

export default router;