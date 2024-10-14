import { Router } from "express";
import { deleteUser, getMe, updateUser } from "../controllers/user";

const router = Router();

router.get('/me', getMe);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;