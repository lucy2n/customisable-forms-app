import { Router } from "express";
import { deleteUser, getMe, getUsers, updateUser } from "../controllers/user";

const router = Router();

router.get('/', getUsers);
router.get('/me', getMe);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;