import wifisRepository from "../repositories/wifisRepository.js";
import { Wifis } from "@prisma/client";
export type CreateWifi = Omit<Wifis, "id" | "createdAt">;
import dotenv from "dotenv";
dotenv.config();
import cryptr from "cryptr";
if (!process.env.CRYPTR_KEY) {
  throw {
    type: "error_internal",
    message: "CRYPTR_KEY not set, check .env file",
  };
}
const cryptrInstance = new cryptr(process.env.CRYPTR_KEY);

async function create(wifi: CreateWifi) {
  const hashedPassword = cryptrInstance.encrypt(wifi.password);
  let hashedWifi = { ...wifi };
  hashedWifi.password = hashedPassword;

  await wifisRepository.createWifi(hashedWifi);
}

async function getWifiById(id: number, userId: number) {
  let wifi = await wifisRepository.getWifiById(id);
  if (!wifi) {
    throw {
      type: "error_not_found",
      message: "wifi not found",
    };
  }
  if (wifi.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to access this wifi",
    };
  }
  wifi.password = cryptrInstance.decrypt(wifi.password);
  return wifi;
}

async function getUserWifis(userId: number) {
  let wifis = await wifisRepository.getUserWifis(userId);
  wifis.forEach((wifi) => {
    wifi.password = cryptrInstance.decrypt(wifi.password);
  });
  return wifis;
}

async function deleteWifi(id: number, userId: number) {
  const wifi = await wifisRepository.getWifiById(id);
  if (!wifi) {
    throw {
      type: "error_not_found",
      message: "wifi not found",
    };
  }
  if (wifi.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to delete this wifi",
    };
  }
  await wifisRepository.deleteWifi(id);
}

const wifisService = { create, getUserWifis, getWifiById, deleteWifi };
export default wifisService;
