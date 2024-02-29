import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { generateAccessToken } from "../middleware/generateToken.js";
import { authenticateUser } from "../utils/authenticateUser.js";

dotenv.config();

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists) {
      console.log(
        "User attempted to register again with the same email address."
      );
      return res.status(400).json({ message: "User found, already exists" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 12);
      const newUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          email: email,
          name: name,
          password: hashedPassword,
        },
      });
      const newBudget = await prisma.budget.create({
        data: {
          id: uuidv4(),
          month: "Change me!",
          year: new Date().getFullYear().toString(),
          userId: newUser.id,
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

      return res.status(200).json({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later." });
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

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  // console.log(email);
  // console.log(password);
  // console.log("Attempting to sign a user in.");
  try {
    // const prisma = new PrismaClient();
    const isValidUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!isValidUser) {
      return res.status(404).json({ message: "User not found." });
    } else {
      const userName = isValidUser.name;
      const storedPassword = isValidUser.password;
      // console.log(storedPassword);
      // console.log(password + ": Type: " + typeof password);
      const isPasswordValid = authenticateUser(password, storedPassword);
      // console.log("Password valid: " + isPasswordValid);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Incorrect email or password, please try again." });
      } else {
        const authToken = generateAccessToken(isValidUser.id);
        return res
          .cookie("authToken", authToken, { httpOnly: true })
          .status(200)
          .json({ message: "Sign in successful." });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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

export const signOut = (req, res) => {
  // authenticateToken middleware sets req.user to the user's ID for identification
  const Id = req.user;

  console.log("Signing out user: ", Id);
  return res
    .clearCookie("authToken")
    .status(200)
    .json({ message: "Sign out successful" });
};

export const updateUserEmail = async (req, res) => {
  // authenticateToken middleware sets req.user to the user's ID for identification
  const Id = req.user;
  const newEmail = req.body.email;
  try {
    const isNewEmailTaken = await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });
    if (isNewEmailTaken) {
      return res.status(400).json({ message: "Email is already registered." });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: Id,
        },
      });
      const userName = user.name;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const updatedUserEmail = await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            email: newEmail,
          },
        });
        const authToken = generateAccessToken(updatedUserEmail.id);
        return res
          .cookie("authToken", authToken, { httpOnly: true })
          .status(200)
          .json({ message: "Email updated successfully." });
      }
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `${err.message}` });
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

export const updateUserName = async (req, res) => {
  // authenticateToken middleware sets req.user to the user's ID for identification
  const Id = req.user;
  const newName = req.body.name;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Id,
      },
    });
    if (user.name === newName) {
      return res.status(400).json({ message: "Name is already set." });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const updatedUserName = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: newName,
        },
      });
      return res
        .status(200)
        .json({ message: "User name updated successfully." });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `${err.message}` });
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

export const updateUserPassword = async (req, res) => {
  // authenticateToken middleware sets req.user to the user's ID for identification
  const Id = req.user;
  const currentPassword = req.body.password;
  const newPassword = req.body.newPassword;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const authenticatedUser = authenticateUser(
        currentPassword,
        user.password
      );
      if (!authenticatedUser) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        const newPasswordHashed = bcrypt.hashSync(newPassword, 12);
        const updatedUserPassword = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: newPasswordHashed,
          },
        });
        return res
          .status(200)
          .json({ message: "Password successfully updated." });
      }
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `${err.message}` });
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

export const authCheck = async (req, res) => {
  return res.status(200).json({ message: "User authenticated with cookie." });
};

export const getUserInfo = async (req, res) => {
  const Id = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const { password, ...userInfo } = user;
      return res.status(200).json(userInfo);
    }
  } catch (err) {
    console.error(err.message);
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
