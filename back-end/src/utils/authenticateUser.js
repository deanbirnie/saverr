import bcrypt from "bcryptjs";

export const authenticateUser = (password, storedPassword) => {
  const passwordValidity = bcrypt.compareSync(password, storedPassword);
  // console.log("Password valid: " + passwordValidity);
  return passwordValidity;
};
