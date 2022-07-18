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

const cardsController = {
  create,
};
export default cardsController;
