import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const getBudgets = async (req, res) => {
  const userId = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const allBudgets = await prisma.budget.findMany({
      where: {
        userId: user.id,
      },
    });
    if (allBudgets.length === 0) {
      return res.status(404).json({ message: "No budgets found." });
    }
    return res.status(200).json(allBudgets);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const createBudget = async (req, res) => {
  const userId = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const newBudget = await prisma.budget.create({
      data: {
        id: uuidv4(),
        month: req.body.month,
        year: req.body.year,
        userId: user.id,
      },
    });
    const defaultIncome = await prisma.income.create({
      data: {
        id: uuidv4(),
        name: "Income",
        budgetId: newBudget.id,
      },
    });
    const defaultIncomeItem = await prisma.incomeItem.create({
      data: {
        id: uuidv4(),
        name: "Salary",
        incomeId: defaultIncome.id,
        budgetId: newBudget.id,
      },
    });
    const defaultExpense = await prisma.expenseCategory.create({
      data: {
        id: uuidv4(),
        name: "Expenses",
        budgetId: newBudget.id,
      },
    });
    const defaultExpenseItem = await prisma.expenseItem.create({
      data: {
        id: uuidv4(),
        name: "Rent",
        expenseCategoryId: defaultExpense.id,
        budgetId: newBudget.id,
      },
    });
    if (newBudget.length === 0) {
      return res.status(401).json({ message: "Couldn't create budget." });
    }
    return res.status(201).json(newBudget);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const getBudgetInfo = async (req, res) => {
  const userId = req.user;
  const budgetId = req.query.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
        userId: user.id,
      },
      include: {
        income: {
          include: {
            incomeItems: true,
          },
        },
        expenseCategories: {
          include: {
            expenseItems: true,
          },
        },
      },
    });
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }
    return res.status(200).json(budget);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const deleteBudget = async (req, res) => {
  const userId = req.user;
  const budgetId = req.query.id;
  console.log(budgetId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const expenseItems = await prisma.expenseItem.deleteMany({
      where: {
        budgetId: budgetId,
      },
    });
    const incomeItems = await prisma.incomeItem.deleteMany({
      where: {
        budgetId: budgetId,
      },
    });
    const expenseCategories = await prisma.expenseCategory.deleteMany({
      where: {
        budgetId: budgetId,
      },
    });
    const income = await prisma.income.deleteMany({
      where: {
        budgetId: budgetId,
      },
    });
    const budget = await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }
    return res.status(200).json({ message: "Budget deleted successfully." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const newExpenseItem = async (req, res) => {
  const userId = req.user;
  const budgetId = req.body.budgetId;
  const categoryId = req.body.categoryId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const newExpenseItem = await prisma.expenseItem.create({
      data: {
        id: uuidv4(),
        name: req.body.name,
        value: req.body.value,
        expenseCategoryId: categoryId,
        budgetId: budgetId,
      },
    });

    if (newExpenseItem.length === 0) {
      return res.status(401).json({ message: "Couldn't create expense item." });
    }
    return res.status(201).json(newExpenseItem);
  } catch (err) {
    console.log(err.message);
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const deleteExpenseItem = async (req, res) => {
  const userId = req.user;
  const itemId = req.query.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const deletedExpenseItem = await prisma.expenseItem.delete({
      where: {
        id: itemId,
      },
    });
    if (!deletedExpenseItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.status(200).json({ message: "Item deleted successfully." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const newIncomeItem = async (req, res) => {
  const userId = req.user;
  const budgetId = req.body.budgetId;
  const categoryId = req.body.categoryId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const newIncomeItem = await prisma.incomeItem.create({
      data: {
        id: uuidv4(),
        name: req.body.name,
        value: req.body.value,
        incomeId: categoryId,
        budgetId: budgetId,
      },
    });

    if (newIncomeItem.length === 0) {
      return res.status(401).json({ message: "Couldn't create income item." });
    }
    return res.status(201).json(newIncomeItem);
  } catch (err) {
    console.log(err.message);
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const deleteIncomeItem = async (req, res) => {
  const userId = req.user;
  const itemId = req.query.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const deletedIncomeItem = await prisma.incomeItem.delete({
      where: {
        id: itemId,
      },
    });
    if (!deletedIncomeItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.status(200).json({ message: "Item deleted successfully." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};
