import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"];
  if (!token || typeof token !== "string") {
    throw {
      type: "error_unauthorized",
      message: "No token provided",
    };
  }
  if (process.env.JWT_SECRET) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded === "string") {
        throw {
          type: "error_unauthorized",
          message: "Invalid token",
        };
      }
      req.body.userId = decoded.id;
    });
  } else {
    throw {
      type: "error_internal",
      message: "JWT_SECRET not set, check .env file",
    };
  }

  next();
}

export default validateJWT;
