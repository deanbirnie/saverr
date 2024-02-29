import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateAccessToken = (userId) => {
  console.log("Generating access token for user: ", userId);
  return jwt.sign(userId, process.env.JWT_ACCESS_TOKEN_SECRET);
};
