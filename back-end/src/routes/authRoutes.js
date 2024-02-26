import express from "express";
import {
  signIn,
  createUser,
  signOut,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export const router = express.Router();

router.post("/create-user", createUser);
router.post("/signin", signIn);
router.get("/signout", authenticateToken, signOut);
router.post("/update-user-email", authenticateToken, updateUserEmail);
router.post("/update-user-name", authenticateToken, updateUserName);
router.post("/update-user-password", authenticateToken, updateUserPassword);
