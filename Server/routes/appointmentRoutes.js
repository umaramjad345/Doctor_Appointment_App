import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentControllers.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthorized, postAppointment);
router.get("/getall", isAuthorized, getAllAppointments);
router.put("/update/:id", isAuthorized, updateAppointmentStatus);
router.delete("/delete/:id", isAuthorized, deleteAppointment);

export default router;
