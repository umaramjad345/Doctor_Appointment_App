import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Complete the Form", 400));
  }
  try {
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getAllMessages = asyncErrorHandler(async (req, res, next) => {
  try {
    if (req?.user?.role !== "Admin") {
      return next(new ErrorHandler("User Not Authorized", 400));
    }
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteMessage = asyncErrorHandler(async (req, res, next) => {
  console.log(req.params.id);
  try {
    if (req?.user?.role !== "Admin") {
      return next(new ErrorHandler("User Not Authorized", 400));
    }
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Message Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
});
