import { Request, Response } from "express";
import authService from "../services/authService.js";
import { Users } from "@prisma/client";

async function register(req: Request, res: Response) {
  const { email, password }: Users = req.body;
  await authService.register(email, password);
  res.sendStatus(201);
}

async function login(req: Request, res: Response) {
  const { email, password }: Users = req.body;
  const token = await authService.login(email, password);
  res.send(token);
}

const authController = { register, login };
export default authController;
