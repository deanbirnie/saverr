import express from "express";
import { getBudgets } from "../controllers/appController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export const appRouter = express.Router();

appRouter.get("/budgets", authenticateToken, getBudgets);
