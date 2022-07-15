import { Request, Response } from "express";
import { Credentials } from "@prisma/client";
import credentialsService from "../services/credentialsService.js";

async function create(req: Request, res: Response) {
  const { url, username, password, title, userId }: Credentials = req.body;
  await credentialsService.create(url, title, username, password, userId);
  res.sendStatus(201);
}

const credentialsController = { create };
export default credentialsController;
