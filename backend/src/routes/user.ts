import { Router } from "express";
import { deleteUser, getUsers, updateUser } from "../controllers/user";

const router = Router();

router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;