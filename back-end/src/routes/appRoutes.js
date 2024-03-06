import express from "express";
import {
  getBudgets,
  createBudget,
  getBudgetInfo,
  deleteBudget,
  newExpenseItem,
  deleteExpenseItem,
  newIncomeItem,
  deleteIncomeItem,
} from "../controllers/appController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export const appRouter = express.Router();

appRouter.get("/find-budgets", authenticateToken, getBudgets);
appRouter.post("/create-budget", authenticateToken, createBudget);
appRouter.get("/get-budget-info", authenticateToken, getBudgetInfo);
appRouter.delete("/delete-budget", authenticateToken, deleteBudget);
appRouter.post("/add-expense-item", authenticateToken, newExpenseItem);
appRouter.delete("/delete-expense-item", authenticateToken, deleteExpenseItem);
appRouter.post("/add-income-item", authenticateToken, newIncomeItem);
appRouter.delete("/delete-income-item", authenticateToken, deleteIncomeItem);
