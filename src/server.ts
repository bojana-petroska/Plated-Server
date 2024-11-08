dotenv.config();
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import { AppDataSource } from './database/ormconfig.js';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandling.js';
import authRouter from './routes/authRoutes.js';

console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database connected!`);

    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
  }
};

startServer();
