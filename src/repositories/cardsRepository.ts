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

const cardsRepository = {
  createCard,
  getCardByTitleAndId,
};

export default cardsRepository;
