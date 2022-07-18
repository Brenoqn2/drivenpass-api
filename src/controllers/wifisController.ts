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

async function getWifiById(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "wifi not found",
    };
  }
  const { userId } = req.body;
  const wifi = await wifisService.getWifiById(Number(id), userId);
  res.send(wifi);
}

async function getUserWifis(req: Request, res: Response) {
  const { userId } = req.body;
  const wifis = await wifisService.getUserWifis(userId);
  res.send(wifis);
}

const wifisController = {
  create,
  getWifiById,
  getUserWifis,
};

export default wifisController;
