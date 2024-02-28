import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBudgets = async (req, res) => {
  const userEmail = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    const allBudgets = await prisma.budget.findMany({
      where: {
        userId: user.id,
      },
    });
    if (Object.keys(allBudgets).length === 0) {
      return res.status(404).json({ message: "No budgets found." });
    }
    return res.status(200).json(allBudgets);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    console.log("Disconnecting client...");
    try {
      await prisma.$disconnect();
      console.log("Client disconnected successfully.");
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const createBudget = async (req, res) => {
  const userEmail = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const newBudget = await prisma.budget.create({
      data: {
        userId: user.id,
        month: req.body.month,
        year: req.body.year,
      },
    });
    if (Object.keys(newBudget).length === 0) {
      return res.status(401).json({ message: "Couldn't create budget." });
    }
    return res.status(201).json(newBudget);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    console.log("Disconnecting client...");
    try {
      await prisma.$disconnect();
      console.log("Client disconnected successfully.");
    } catch (err) {
      console.error("Couldn't disconnect client: " + err.message);
    }
  }
};

export const getBudgetInfo = () => {};
