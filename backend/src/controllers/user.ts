import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import UnauthorizedError from '../errors/unauthorized-err';
import { IUserRequest } from '../types';
import ForbiddenError from '../errors/forbidden-error';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import { BAD_REQUEST_ERROR_ALL_FIELDS_REQUIRED, BAD_REQUEST_ERROR_USER_DATA_MESSAGE, BAD_REQUEST_ERROR_USER_EMAIL_MESSAGE, CREATED, FORBIDDEN_ERROR_USER, FORBIDDEN_ERROR_USER_BLOCKED, NOT_FOUND_ERROR_USER_MESSAGE, UNAUTHORIZED_ERROR_USER_MESSAGE } from '../utils/constants';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError(BAD_REQUEST_ERROR_ALL_FIELDS_REQUIRED);
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestError(BAD_REQUEST_ERROR_USER_EMAIL_MESSAGE)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      is_admin: false,
    });

    res.status(CREATED).json(newUser);
  } catch (err: any) {
    console.error(err);
    throw new InternalServerError(err.message)
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError(BAD_REQUEST_ERROR_USER_DATA_MESSAGE);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_USER_MESSAGE);
    }

    if (user.status === 'blocked') {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER_BLOCKED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError(BAD_REQUEST_ERROR_USER_DATA_MESSAGE);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      'super-strong-secret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError(BAD_REQUEST_ERROR_USER_DATA_MESSAGE);
    } else {
      throw new InternalServerError(`Server error on login ${err}`)
    }
  }
};

export const getMe = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    console.log(userId)

    if (!userId) {
      throw new BadRequestError(NOT_FOUND_ERROR_USER_MESSAGE)
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError(NOT_FOUND_ERROR_USER_MESSAGE);
    }

    res.json({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      is_admin: user?.is_admin,
    });
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err: any) {
    throw new InternalServerError(err.message)
  }
};

export const updateUser = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError(NOT_FOUND_ERROR_USER_MESSAGE);
    }

    if (req.user?.id !== user.id && !req.user?.is_admin) {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER);
    }

    await user.update(req.body);
    res.json(user);
  } catch (err: any) {
    console.error(err);
    throw new BadRequestError(err.message);
  }
};

export const deleteUser = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError(NOT_FOUND_ERROR_USER_MESSAGE)
    }

    if (req.user?.id !== user.id && !req.user?.is_admin) {
      throw new ForbiddenError(FORBIDDEN_ERROR_USER);
    }

    await user?.destroy();
    res.json({ message: `User with id ${id} deleted` });
  } catch (err: any) {
    console.error(err);
    throw new InternalServerError(err.message)
  }
};