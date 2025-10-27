import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import entryRoutes from './routes/entries';
import { errorHandler } from './utils/errorHandler';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // To support larger image URLs/data if needed


// serve uploaded images
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

app.use(errorHandler);

export default app;
