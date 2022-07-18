import { Request, Response } from "express";
import { Wifis } from "@prisma/client";
import wifisService from "../services/wifisService.js";

async function create(req: Request, res: Response) {
  const { title, ssid, password, userId }: Wifis = req.body;
  await wifisService.create({
    title,
    ssid,
    userId,
    password,
  });
  res.sendStatus(201);
}

const wifisController = {
  create,
};

export default wifisController;
