import { Request, Response } from "express";
import { Credentials } from "@prisma/client";
import credentialsService from "../services/credentialsService.js";

async function create(req: Request, res: Response) {
  const { url, username, password, title, userId }: Credentials = req.body;
  await credentialsService.create(url, title, username, password, userId);
  res.sendStatus(201);
}

async function getCredentialById(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "Credential not found",
    };
  }
  const { userId } = req.body;
  const credential = await credentialsService.getCredentialById(
    Number(id),
    userId
  );
  res.send(credential);
}

async function getUserCredentials(req: Request, res: Response) {
  const { userId } = req.body;
  const credentials = await credentialsService.getUserCredentials(userId);
  res.send(credentials);
}

async function deleteUserCredential(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "Credential not found",
    };
  }
  const { userId } = req.body;
  await credentialsService.deleteCredential(Number(id), userId);
  res.sendStatus(204);
}

const credentialsController = {
  create,
  getCredentialById,
  getUserCredentials,
  deleteUserCredential,
};
export default credentialsController;
