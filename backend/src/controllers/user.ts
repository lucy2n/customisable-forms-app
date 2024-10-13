import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import UnauthorizedError from '../errors/unauthorized-err';
import { IUserRequest } from '../types';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Валидация входных данных
    if (!email || !password) {
      res.status(400).json({ message: 'Необходимо указать email и пароль' });
      return;
    }

    // Поиск пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedError('Неверные учетные данные');
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Неверные учетные данные');
    }

    // Генерация JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Полезные данные, которые будут в токене
      'super-strong-secret', // Секретный ключ для шифрования
      { expiresIn: '1h' } // Время жизни токена
    );

    // Возврат токена и информации о пользователе
    res.json({
      message: 'Успешный вход',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      res.status(401).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Ошибка сервера при входе' });
    }
  }
};

export const getMe = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const id  = req.user?.id;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера при получении данных пользователя' });
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Валидация входных данных
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Все поля обязательны для заполнения' });
      return;
    }

    // Проверка, существует ли пользователь с таким email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      return;
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      is_admin: false, // Необязательно, если в модели defaultValue: false
    });

    res.status(201).json(newUser);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера при создании пользователя' });
  }
};

// Обновить пользователя
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    // Проверка на существование пользователя
    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
    }

    await user?.update(req.body);
    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: 'Ошибка при обновлении пользователя' });
  }
};

// Удалить пользователя
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Удаление пользователя
    await user?.destroy();
    res.json({ message: `Пользователь с id ${id} удалён` });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера при удалении пользователя' });
  }
};