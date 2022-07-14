import authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

async function register(email: string, password: string) {
  const alreadyUsedEmail = await authRepository.checkEmail(email);
  if (alreadyUsedEmail) {
    throw {
      type: "error_conflict",
      message: "Email already used",
    };
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  await authRepository.register(email, hashedPassword);
}

const authService = { register };
export default authService;
