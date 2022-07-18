import prisma from "../database.js";
import { Cards } from "@prisma/client";
type CreateCard = Omit<Cards, "id" | "createdAt">;

async function createCard(card: CreateCard) {
  await prisma.cards.create({
    data: {
      ...card,
    },
  });
}

async function getCardByTitleAndId(title: string, userId: number) {
  const title_userId = { title, userId };
  const card = await prisma.cards.findUnique({
    where: {
      title_userId,
    },
  });
  return card;
}

async function getUserCards(userId: number) {
  const cards = await prisma.cards.findMany({
    where: {
      userId,
    },
  });
  return cards;
}

async function getCardById(id: number) {
  const card = await prisma.cards.findUnique({
    where: {
      id,
    },
  });
  return card;
}

const cardsRepository = {
  createCard,
  getCardByTitleAndId,
  getUserCards,
  getCardById,
};

export default cardsRepository;
