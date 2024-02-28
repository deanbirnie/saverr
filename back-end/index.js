import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./src/routes/authRoutes.js";
import { appRouter } from "./src/routes/appRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3175;
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Authentication API
app.use("/api/auth", authRouter);

// Application API
app.use("/api/app", appRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
