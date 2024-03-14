import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import expenseRouter from './routes/expense.route';
import categoryRouter from './routes/category.route';
import connectDB from './db';

dotenv.config();
require('dotenv').config({ path: __dirname+'/.env' });

const app = express();

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());


// 4. Cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// 5. Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/categories', categoryRouter);



// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// const port = config.get<number>('port');
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  console.log(process.env.NODE_ENV);
  
  // ? call the connectDB function here
  connectDB();
});

