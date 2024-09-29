import express from 'express';
import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js'

const app = express();
const port = 5001;

app.use(express.json());
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
