import prisma from "../database.js";
import { Wifis } from "@prisma/client";
type CreateWifi = Omit<Wifis, "id" | "createdAt">;

async function createWifi(wifi: CreateWifi) {
  await prisma.wifis.create({
    data: {
      ...wifi,
    },
  });
}

async function getUserWifis(userId: number) {
  const wifis = await prisma.wifis.findMany({
    where: {
      userId,
    },
  });
  return wifis;
}

async function getWifiById(id: number) {
  const wifi = await prisma.wifis.findUnique({
    where: {
      id,
    },
  });
  return wifi;
}

async function deleteWifi(id: number) {
  await prisma.wifis.delete({
    where: {
      id,
    },
  });
}

const wifisRepository = {
  createWifi,
  getUserWifis,
  getWifiById,
  deleteWifi,
};

export default wifisRepository;
