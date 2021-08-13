import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import dotenv from 'dotenv';
import { auth } from './middleware/auth'
// import pool from './models/pool'


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);
dotenv.config();

export default app;
