import express from 'express';
import routes from './routes/index';
import sequelize from './config/database';  // Импорт конфигурации базы данных
import User from './models/user';           // Импорт моделей
import Template from './models/template';
import Form from './models/form';
import Question from './models/question';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Укажите здесь ваш фронтенд URL
  credentials: true, // если нужно передавать куки
}));
app.use(express.json());

// Инициализация ассоциаций между моделями
User.associate && User.associate();
Template.associate && Template.associate();
Form.associate && Form.associate();
Question.associate && Question.associate();

// Синхронизация моделей с базой данных перед запуском сервера
sequelize.sync({ force: false })  // `force: true` пересоздаст таблицы, если они уже существуют
  .then(() => {
    console.log('Database synced successfully');
    // Запуск сервера только после успешной синхронизации с базой данных
    app.listen(3001, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Routes
app.use(routes);
