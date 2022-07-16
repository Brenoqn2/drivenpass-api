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

async function getCredentialById(id: number, userId: number) {
  let credential = await credentialsRepository.getCredentialById(id);
  if (!credential) {
    throw {
      type: "error_not_found",
      message: "Credential not found",
    };
  }
  if (credential.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to access this credential",
    };
  }
  credential.password = cryptrInstance.decrypt(credential.password);
  return credential;
}

async function getUserCredentials(userId: number) {
  let credentials = await credentialsRepository.getUserCredentials(userId);
  credentials.forEach((credential) => {
    credential.password = cryptrInstance.decrypt(credential.password);
  });
  return credentials;
}

async function deleteCredential(id: number, userId: number) {
  const credential = await credentialsRepository.getCredentialById(id);
  if (!credential) {
    throw {
      type: "error_not_found",
      message: "Credential not found",
    };
  }
  if (credential.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to delete this credential",
    };
  }
  await credentialsRepository.deleteCredential(id);
}

const credentialsService = {
  create,
  getCredentialById,
  getUserCredentials,
  deleteCredential,
};
export default credentialsService;
