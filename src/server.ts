import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import { AppDataSource } from './database/ormconfig.js';
import errorHandler from './middlewares/errorHandling.js';
import authRouter from './routes/authRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import handleSocketConnection from './socketManager.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();
const port = 5001;

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
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);
app.use('/images', imageRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(errorHandler);

// Socket.io setup
handleSocketConnection(io);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database connected!`);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(
        `Swagger docs available at http://localhost:${port}/api-docs`
      );
    });
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
  }
};

startServer();

export { io };
