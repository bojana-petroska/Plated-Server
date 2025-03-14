import dotenv from 'dotenv';
import { configs } from './config/env.js';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { AppDataSource } from './config/ormconfig.js';
import errorHandler from './middlewares/errorHandling.js';

import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import authRouter from './routes/authRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import paymentsRoute from './routes/paymentsRoute.js';
import courierRoutes from './routes/courierRoutes.js';

import handleSocketConnection from './socketManager.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);
app.use('/orders', orderRouter);
app.use('/courier', courierRoutes);
app.use('/payments', paymentsRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

handleSocketConnection(io);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database connected!`);

    server.listen(configs.PORT, () => {
      console.log(`Server is running on http://localhost:${configs.PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${configs.PORT}/api-docs`
      );
    });
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
  }
};

startServer();

export { io };
