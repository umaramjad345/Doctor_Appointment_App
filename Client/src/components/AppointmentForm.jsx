import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Alert,
  Button,
  Checkbox,
  FloatingLabel,
  Label,
  Select,
  Spinner,
  Textarea,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { HiInformationCircle } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const AppointmentForm = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [appointmentError, setAppointmentError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data?.doctors);
      } catch (error) {
        console.log("Couldn't Get Doctors");
      }
    };
    if (currentUser?.user) {
      fetchDoctors();
    }
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    if (!currentUser?.user) {
      console.log(appointmentError);
      setAppointmentError("Please, LogIn to Get Appointment!");
      return;
    }
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          doctorId,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setDoctorId("");
      setHasVisited("");
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h2 className="text-4xl my-2 py-2 text-slate-500">Appointment</h2>
      <form onSubmit={handleAppointment} className="w-full">
        <div className="flex items-center justify-between w-full">
          <FloatingLabel
            required
            variant="filled"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <FloatingLabel
            required
            variant="filled"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <FloatingLabel
            required
            variant="filled"
            label="NIC"
            type="number"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <Select
            required
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <FloatingLabel
            required
            variant="filled"
            label="Appointment Date"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <Select
            required
            value={department}
            onChange={(event) => {
              setDepartment(event.target.value);
              setFirstName("");
              setLastName("");
            }}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          >
            {departmentsArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>
                  {depart}
                </option>
              );
            })}
          </Select>
          <Select
            required
            defaultValue={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName, id] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
              setDoctorId(id);
            }}
            disabled={!department}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[31rem] mt-2"
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor?.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName} ${doctor._id}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </Select>
        </div>
        <Textarea
          required
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 mt-4"
        />
        <div className="my-2 flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1">
            <FaRegUserCircle className="text-lg" />
            <p className="text-sm">You must be Logged In to get Appointment</p>
            <Link
              to={"/login"}
              className="text-slate-500 text-base hover:underline mx-2"
            >
              LogIn
            </Link>
          </span>
          <div className="flex flex-row items-center gap-2">
            <Label htmlFor="accept" className="text-lg text-slate-500">
              I've visited before
            </Label>
            <Checkbox
              id="accept"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              className="w-6 h-6 rounded-md m-2"
            />
          </div>
        </div>
        <Button
          outline
          gradientDuoTone="greenToBlue"
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-400 w-1/5 float-end my-4"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Get Appointment"
          )}
        </Button>
      </form>
      {appointmentError && (
        <Alert color="failure" icon={HiInformationCircle} withBorderAccent>
          {appointmentError}
        </Alert>
      )}
    </>
  );
};

export default AppointmentForm;
