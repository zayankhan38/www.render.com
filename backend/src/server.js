import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import videosRouter from './routes/videos.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: env.CORS_ORIGINS,
  credentials: true,
}));

app.use(compression());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});

app.use('/api', apiLimiter);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'render-backend',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'render-backend',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videosRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`🚀 Render API running on port ${PORT} in ${env.NODE_ENV} mode`);
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

export { io };
