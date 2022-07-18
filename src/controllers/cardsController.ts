import { Request, Response } from "express";
import { Cards } from "@prisma/client";
import cardsService from "../services/cardsService.js";

async function create(req: Request, res: Response) {
  const {
    title,
    number,
    name,
    expireDate,
    cvv,
    type,
    password,
    userId,
  }: Cards = req.body;
  await cardsService.create({
    title,
    number,
    name,
    expireDate,
    cvv,
    type,
    userId,
    password,
  });
  res.sendStatus(201);
}

async function getCardById(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "card not found",
    };
  }
  const { userId } = req.body;
  const card = await cardsService.getCardById(Number(id), userId);
  res.send(card);
}

async function getUserCards(req: Request, res: Response) {
  const { userId } = req.body;
  const cards = await cardsService.getUserCards(userId);
  res.send(cards);
}

async function deleteUserCard(req: Request, res: Response) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    throw {
      type: "error_not_found",
      message: "card not found",
    };
  }
  const { userId } = req.body;
  await cardsService.deleteCard(Number(id), userId);
  res.sendStatus(204);
}

const cardsController = {
  create,
  getCardById,
  getUserCards,
  deleteUserCard,
};

export default cardsController;
