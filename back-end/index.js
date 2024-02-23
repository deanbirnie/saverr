import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3175;
const app = express();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
