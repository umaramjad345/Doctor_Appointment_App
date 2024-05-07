import { asyncErrorHandler } from "./asyncErrorHandler.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthorized = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("You're not Authorized", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(new ErrorHandler("Invalid Token", 401));
    }
    req.user = user;
    next();
  });
});
