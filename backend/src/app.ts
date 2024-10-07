import express from 'express';
import routes from './routes';
import auth from './middlewares/auth';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(auth);
app.use('/api', routes);

// Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});