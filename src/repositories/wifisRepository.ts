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

const wifisRepository = {
  createWifi,
};

export default wifisRepository;
