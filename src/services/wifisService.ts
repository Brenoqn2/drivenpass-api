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

const wifisService = { create };
export default wifisService;
