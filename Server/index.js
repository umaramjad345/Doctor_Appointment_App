import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./dbConnection/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

const app = express();
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT || 3000;

dbConnection();

app.use(
  cors({
    origin: [process.env.FRONT_END_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(port, () => {
  try {
    console.log(`Server is Listening on http://localhost:${port}`);
  } catch (error) {
    console.log("Server Couldn't be Started");
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/appointment", appointmentRoutes);

app.use(errorMiddleware);
