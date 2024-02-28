import express from "express";
import {
  signIn,
  createUser,
  signOut,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
  authCheck,
  getUserInfo,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export const authRouter = express.Router();

authRouter.post("/create-user", createUser);
authRouter.post("/signin", signIn);
authRouter.get("/signout", authenticateToken, signOut);
authRouter.post("/update-user-email", authenticateToken, updateUserEmail);
authRouter.post("/update-user-name", authenticateToken, updateUserName);
authRouter.post("/update-user-password", authenticateToken, updateUserPassword);
authRouter.get("/check-auth", authenticateToken, authCheck);
authRouter.get("/get-userinfo", authenticateToken, getUserInfo);
