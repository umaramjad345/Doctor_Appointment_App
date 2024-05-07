import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

export const register = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("User is Already Registered!", 400));
    }

    const user = await User.create(req.body);
    generateToken(user, "User Registered!", 200, res);
  } catch (error) {
    next(error);
  }
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    generateToken(user, "Login Successfully!", 201, res);
  } catch (error) {
    next(error);
  }
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "User Logged Out Successfully" });
  } catch (error) {
    next(error);
  }
});
