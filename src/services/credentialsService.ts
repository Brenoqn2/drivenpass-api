import credentialsRepository from "../repositories/credentialsRepository.js";
import cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.CRYPTR_KEY) {
  throw {
    type: "error_internal",
    message: "CRYPTR_KEY not set, check .env file",
  };
}
const cryptrInstance = new cryptr(process.env.CRYPTR_KEY);

async function create(
  url: string,
  title: string,
  username: string,
  password: string,
  userId: number
) {
  const alreadyUsedTitle =
    await credentialsRepository.getCredentialByTitleAndId(title, userId);
  if (alreadyUsedTitle) {
    throw {
      type: "error_conflict",
      message: "Title already used",
    };
  }
  const hashedPassword = cryptrInstance.encrypt(password);
  const credential = { url, title, username, password: hashedPassword, userId };
  await credentialsRepository.insertCredential(credential);
}

const credentialsService = { create };
export default credentialsService;
