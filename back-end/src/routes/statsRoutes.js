import express from "express";
import { userList, userCount, apiTest } from '../controllers/statsController.js';

export const statsRouter = express.Router();

statsRouter.get('/user-list', userList);
statsRouter.get('/user-count', userCount);
statsRouter.get('/test', apiTest);
