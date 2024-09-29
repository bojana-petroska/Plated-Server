import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import menuItemRouter from './routes/menuItemRoutes.js';

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);
app.use('/menu-items', menuItemRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
