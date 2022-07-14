import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on port ${process.env.PORT || 4000}`);
});
