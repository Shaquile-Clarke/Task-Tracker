import { hash, compare } from "bcrypt";

export async function encryptPassword(password) {
  const encryptedPassword = await hash(password, 12);
  return encryptedPassword;
}

export async function validatePassword(oldPassword, password) {
  const isValid = await compare(oldPassword, password);
  return isValid;
}
