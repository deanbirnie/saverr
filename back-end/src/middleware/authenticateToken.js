import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (token === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: `${err.message}` });
    }
    req.user = user;
    console.log("User authenticated: ", user);
    next();
  });
};
