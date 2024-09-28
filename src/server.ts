import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res) => {
  console.log(`server started`);
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
