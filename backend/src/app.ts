import express from 'express';
import routes from './routes/index';
import sequelize from './config/database';  // Импорт конфигурации базы данных
import User from './models/user';           // Импорт моделей
import Template from './models/template';
import Form from './models/form';
import Question from './models/question';
import cors from 'cors';
import Answer from './models/answer';
import Like from './models/like';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Initialize associations
User.associate && User.associate();
Template.associate && Template.associate();
Form.associate && Form.associate();
Question.associate && Question.associate();
Answer.associate && Answer.associate();
Like.associate && Like.associate();

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Routes
app.use(routes);
