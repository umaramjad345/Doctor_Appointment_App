import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = asyncErrorHandler(async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      doctorId,
      address,
      hasVisited,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !doctorId ||
      !address
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const patientId = req?.user?.id;
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });
    res.status(200).json({
      success: true,
      appointment,
      message: "Appointment Sent!",
    });
  } catch (error) {
    next(error);
  }
});

export const getAllAppointments = asyncErrorHandler(async (req, res, next) => {
  try {
    let appointments;
    if (req?.user?.role === "Patient") {
      appointments = await Appointment.find({ patientId: req?.user?.id });
    } else if (req?.user?.role === "Doctor") {
      appointments = await Appointment.find({ doctorId: req?.user?.id });
    } else {
      appointments = await Appointment.find();
    }
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
});

export const updateAppointmentStatus = asyncErrorHandler(
  async (req, res, next) => {
    try {
      if (req?.user?.role === "Patient") {
        return next(new ErrorHandler("Not Authorized to Change Status", 400));
      }
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
      });
    } catch (error) {
      next(error);
    }
  }
);

export const deleteAppointment = asyncErrorHandler(async (req, res, next) => {
  try {
    if (req?.user?.role !== "Admin" && req?.user?.role !== "Patient") {
      return next(new ErrorHandler("User Not Authorized"));
    }
    const { id } = req?.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  } catch (error) {
    next(error);
  }
});
