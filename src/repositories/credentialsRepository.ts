import prisma from "../database.js";
import { Credentials } from "@prisma/client";

type insertCredential = Omit<Credentials, "id" | "createdAt">;

async function insertCredential(credential: insertCredential) {
  await prisma.credentials.create({
    data: {
      ...credential,
    },
  });
}

async function getCredentialByTitleAndId(title: string, userId: number) {
  const title_userId = { title, userId };
  const credential = await prisma.credentials.findUnique({
    where: {
      title_userId,
    },
  });
  return credential;
}

async function getUserCredentials(userId: number) {
  const credentials = await prisma.credentials.findMany({
    where: {
      userId,
    },
  });
  return credentials;
}

async function getCredentialById(id: number) {
  const credential = await prisma.credentials.findUnique({
    where: {
      id,
    },
  });
  return credential;
}

async function deleteCredential(id: number) {
  await prisma.credentials.delete({
    where: {
      id,
    },
  });
}

const credentialsRepository = {
  insertCredential,
  getCredentialByTitleAndId,
  getUserCredentials,
  getCredentialById,
  deleteCredential,
};
export default credentialsRepository;
