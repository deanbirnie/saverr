import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateAccessToken = (userEmail) => {
  console.log("Generating access token for user: ", userEmail);
  return jwt.sign(userEmail, process.env.JWT_ACCESS_TOKEN_SECRET);
};
