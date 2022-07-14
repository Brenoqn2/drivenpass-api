import { Request, Response } from "express";
import authService from "../services/authService.js";
import { Users } from "@prisma/client";

async function register(req: Request, res: Response) {
  const { email, password }: Users = req.body;
  await authService.register(email, password);
  res.sendStatus(201);
}

const authController = { register };
export default authController;
