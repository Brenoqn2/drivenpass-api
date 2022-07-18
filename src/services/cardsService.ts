import cardsRepository from "../repositories/cardsRepository.js";
import { Cards } from "@prisma/client";
export type CreateCard = Omit<Cards, "id" | "createdAt">;
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

async function create(card: CreateCard) {
  const alreadyUsedTitle = await cardsRepository.getCardByTitleAndId(
    card.title,
    card.userId
  );
  if (alreadyUsedTitle) {
    throw {
      type: "error_conflict",
      message: "Title already used",
    };
  }

  const hashedPassword = cryptrInstance.encrypt(card.password);
  const hashedCvv = cryptrInstance.encrypt(card.cvv);
  let hashedCard = { ...card };
  hashedCard.password = hashedPassword;
  hashedCard.cvv = hashedCvv;

  await cardsRepository.createCard(hashedCard);
}

const cardsService = { create };
export default cardsService;
