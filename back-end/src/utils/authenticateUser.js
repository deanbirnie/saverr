import bcrypt from "bcryptjs";

export const authenticateUser = (password, storedPassword) => {
  return bcrypt.compareSync(password, storedPassword);
};
