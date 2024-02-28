import express from "express";
import { getBudgets, createBudget } from "../controllers/appController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export const appRouter = express.Router();

appRouter.get("/find-budgets", authenticateToken, getBudgets);
appRouter.post("/create-budget", authenticateToken, createBudget);
