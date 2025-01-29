import dotenv from 'dotenv';
import { configs } from './config/env.js';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import { AppDataSource } from './config/ormconfig.js';
import errorHandler from './middlewares/errorHandling.js';
import authRouter from './routes/authRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import handleSocketConnection from './socketManager.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import courierRoutes from './routes/courierRoutes.js';

const app = express();
// const port = 5001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  },
});

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Route setup
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);
app.use('/orders', orderRouter);
app.use('/courier', courierRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(errorHandler);

// Socket.io setup
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
