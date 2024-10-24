import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import sequelize from './config/database';
import User from './models/user';
import Template from './models/template';
import Form from './models/form';
import Question from './models/question';
import Answer from './models/answer';
import Like from './models/like';
import cors from 'cors';
import { SERVER_ERROR } from './utils/constants';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://customisable-forms-app.vercel.app',
  credentials: true,
}));

app.use(express.json());

User.associate && User.associate();
Template.associate && Template.associate();
Form.associate && Form.associate();
Question.associate && Question.associate();
Answer.associate && Answer.associate();
Like.associate && Like.associate();

app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR
        ? 'Server error'
        : message
    });
}); 

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