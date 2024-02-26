import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3175;
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Authentication API
app.use("/api/auth", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
