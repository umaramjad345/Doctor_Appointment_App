import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const updateUser = asyncErrorHandler(async (req, res, next) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      return next(new ErrorHandler("User Not Authorized", 400));
    }
    const user = await User.findById(req?.user?.id);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 400));
    }
    const isRegistered = await User.findById(req?.user?.id);
    if (!isRegistered) {
      return next(new ErrorHandler("User Not Found", 400));
    }
    if (req?.body?.password !== "") {
      if (req?.body?.password?.length < 5) {
        return next(new ErrorHandler("Password Must be Atleast 5 Characters"));
      }
      const salt = genSalt(10);
      req.body.password = await bcrypt.hash(req?.body?.password, salt);
    }
    let avatar;
    let cloudinaryResponse;
    if (req?.files && Object.keys(req?.files).length !== 0) {
      avatar = req.files.avatar;
      const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
      }
      cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
        );
      }
    }
    const updateFields = {
      firstName: req?.body?.firstName || user?.firstName,
      lastName: req?.body?.lastName || user?.lastName,
      phone: req?.body?.phone || user?.phone,
      dob: req?.body?.dob || user?.dob,
      gender: req?.body?.gender || user?.gender,
      password: req?.body?.password || user?.password,
    };

    if (cloudinaryResponse) {
      updateFields.avatar = {
        public_id: cloudinaryResponse?.public_id,
        url: cloudinaryResponse?.secure_url,
      };
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    generateToken(updatedUser, "User Updated Successfully", 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export const addNewAdmin = asyncErrorHandler(async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return next(new ErrorHandler("User Not Authorized", 400));
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Admin Avatar is Required!", 400));
    }
    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(avatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !avatar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler(
          `${isRegistered.role} With This Email Already Exists!`,
          400
        )
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Admin",
      avatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  } catch (error) {
    next(error);
  }
});

export const addNewDoctor = asyncErrorHandler(async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return next(new ErrorHandler("User Not Authorized", 400));
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(avatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment ||
      !avatar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler("Doctor With This Email Already Exists!", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      avatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  } catch (error) {
    next(error);
  }
});

export const getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return next(new ErrorHandler("User Not Authorized", 400));
    }
    const users = await User.find({ role: { $in: ["Patient", "Admin"] } });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
});

export const getAllDoctors = asyncErrorHandler(async (req, res, next) => {
  try {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteUser = async (req, res, next) => {
  if (req.user.role !== "Admin" && req.user.id !== req.params.id) {
    return next(
      new ErrorHandler("You're not Allowed to delete this User", 400)
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User has been Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
