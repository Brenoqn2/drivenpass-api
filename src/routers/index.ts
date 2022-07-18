import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import notesRouter from "./notesRouter.js";
import cardsRouter from "./cardsRouter.js";
import wifisRouter from "./wifisRouter.js";

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(cardsRouter);
router.use(wifisRouter);

export default router;
