import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/userSlice.js";
import { Alert, Button, FloatingLabel, Select, Spinner } from "flowbite-react";

const Register = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      dispatch(registerStart());
      await axios
        .post(
          "http://localhost:4000/api/v1/auth/register",
          {
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          dispatch(registerSuccess(res?.data));
          navigate("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(registerFailure(error?.response?.data?.message));
    }
  };

  if (currentUser?.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="px-3 py-5 my-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
      <div className="flex flex-col justify-start">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-slate-500 my-1 py-2 px-2"
        >
          <span className="text-4xl overflow-hidden">City</span>
          <span className="text-4xl font-light overflow-hidden">Care</span>
        </Link>
        <p className="text-md mt-2 text-slate-500">
          Your Trusted Health Care Partner
        </p>
      </div>
      <div className="flex-1">
        <form
          className="flex flex-col gap-4 w-1/2 mx-auto"
          onSubmit={handleRegistration}
        >
          <h1 className="text-4xl py-2 text-center text-teal-600 dark:text-teal-200">
            Welcome!
          </h1>
          <FloatingLabel
            required
            variant="filled"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <FloatingLabel
            required
            variant="filled"
            label="NIC"
            type="number"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <Select
            required
            defaultValue={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <FloatingLabel
            required
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
          />
          <Button
            outline
            gradientDuoTone="greenToBlue"
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-400"
          >
            {loading ? "Loading..." : "LogIn"}
          </Button>
        </form>
        <div className="flex flex-col gap-4 w-1/2 mx-auto text-slate-500">
          <div className="flex gap-2 mt-5">
            <span className="text-base">Already Registered</span>
            <Link
              to={"/login"}
              className="text-slate-500 text-base hover:underline"
            >
              LogIn
            </Link>
          </div>
          {error ? (
            <Alert color="failure" rounded className="mt-5">
              {error}
            </Alert>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
