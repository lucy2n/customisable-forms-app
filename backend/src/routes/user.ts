import { Router } from "express";
import { deleteUser, getMe, updateUser } from "../controllers/user";

const router = Router();

router.get('/users/me', getMe);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;