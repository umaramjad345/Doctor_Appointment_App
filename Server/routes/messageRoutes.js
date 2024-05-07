import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
} from "../controllers/messageControllers.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAuthorized, getAllMessages);
router.delete("/delete/:id", isAuthorized, deleteMessage);

export default router;
