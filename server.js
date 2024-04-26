import express from 'express';
import cors from 'cors';
import apiRouter from './api/routes/api.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use('/api', apiRouter);


app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});