import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


import sentimentRoutes from './routes/sentimentRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', sentimentRoutes);


app.get('/health', (_req, res) => {
res.json({ status: 'ok' });
});


export default app;