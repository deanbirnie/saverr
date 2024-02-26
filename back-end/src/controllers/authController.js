import bcrypt from "bcryptjs";
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
      console.log(hashedPassword);
      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: hashedPassword,
        },
      });
      return res.status(200).json({
        user: {
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
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const prisma = new PrismaClient();
    const isValidUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!isValidUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const userName = isValidUser.name;
      const storedPassword = isValidUser.password;
      const isPasswordValid = authenticateUser(password, storedPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        const authToken = generateAccessToken(email);
        return res
          .cookie("authToken", authToken, { httpOnly: true })
          .status(200)
          .json({
            user: {
              email: email,
              name: userName,
            },
          });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signOut = (req, res) => {
  // authenticateToken middleware sets req.user to the user's email for identification
  const email = req.user;

  console.log("Signing out user: ", email);
  return res
    .clearCookie("authToken")
    .status(200)
    .json({ message: "Sign out successful" });
};

export const updateUserEmail = async (req, res) => {
  // authenticateToken middleware sets req.user to the user's email for identification
  const email = req.user;
  const newEmail = req.body.email;
  try {
    const isNewEmailTaken = await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });
    if (isNewEmailTaken) {
      return res.status(400).json({ message: "Email is already taken" });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const userName = user.name;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const updatedUserEmail = await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            email: newEmail,
          },
        });
        const authToken = generateAccessToken(updatedUserEmail.email);
        return res
          .cookie("authToken", authToken, { httpOnly: true })
          .status(200)
          .json({ user: { email: updatedUserEmail.email, name: userName } });
      }
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};

export const updateUserName = async (req, res) => {
  // authenticateToken middleware sets req.user to the user's email for identification
  const email = req.user;
  const newName = req.body.name;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const updatedUserName = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: newName,
        },
      });
      const authToken = generateAccessToken(email);
      return res
        .cookie("authToken", authToken, { httpOnly: true })
        .status(200)
        .json({ user: { email: email, name: updatedUserName.name } });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};

export const updateUserPassword = async (req, res) => {
  // authenticateToken middleware sets req.user to the user's email for identification
  const email = req.user;
  const currentPassword = req.body.password;
  const newPassword = req.body.newPassword;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
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
            email: email,
          },
          data: {
            password: newPasswordHashed,
          },
        });
        const authToken = generateAccessToken(email);
        return res
          .cookie("authToken", authToken, { httpOnly: true })
          .status(200)
          .json({ user: { email: email, name: user.name } });
      }
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};
