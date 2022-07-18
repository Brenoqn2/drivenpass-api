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

async function getCardById(id: number, userId: number) {
  let card = await cardsRepository.getCardById(id);
  if (!card) {
    throw {
      type: "error_not_found",
      message: "Card not found",
    };
  }
  if (card.userId !== userId) {
    throw {
      type: "error_forbidden",
      message: "You are not allowed to access this card",
    };
  }
  card.password = cryptrInstance.decrypt(card.password);
  card.cvv = cryptrInstance.decrypt(card.cvv);
  return card;
}

async function getUserCards(userId: number) {
  let cards = await cardsRepository.getUserCards(userId);
  cards.forEach((card) => {
    card.password = cryptrInstance.decrypt(card.password);
    card.cvv = cryptrInstance.decrypt(card.cvv);
  });
  return cards;
}

const cardsService = { create, getUserCards, getCardById };
export default cardsService;
