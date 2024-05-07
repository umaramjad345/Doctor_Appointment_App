import express from "express";
import {
  updateUser,
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  getAllUsers,
  deleteUser,
} from "../controllers/userControllers.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/patient/me", isAuthorized, getUserDetails);
router.get("/admin/me", isAuthorized, getUserDetails);

router.put("/update/:id", isAuthorized, updateUser);
router.delete("/delete/:id", isAuthorized, deleteUser);
router.get("/getusers", isAuthorized, getAllUsers);
router.get("/doctors", isAuthorized, getAllDoctors);
router.post("/doctor/addnew", isAuthorized, addNewDoctor);
router.post("/admin/addnew", isAuthorized, addNewAdmin);

export default router;
