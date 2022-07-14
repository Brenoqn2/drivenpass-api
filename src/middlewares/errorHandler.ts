import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err.type === "error_schema") {
    res.status(422).send(err.message);
  }
  res.status(500).send("Something broke!");

  next(err);
};

export default errorHandler;
