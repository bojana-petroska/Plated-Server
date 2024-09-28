import express from 'express';
import router from './routes/userRoutes.js';

const app = express();
const port = 5001;

app.use(express.json());
app.use('/users', router);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/users`);
});
