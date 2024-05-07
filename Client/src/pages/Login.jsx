import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice.js";
import { Alert, Button, FloatingLabel, Spinner } from "flowbite-react";

const Login = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginStart());
      await axios
        .post(
          "http://localhost:4000/api/v1/auth/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          dispatch(loginSuccess(res?.data));
          navigate("/");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(loginFailure(error?.response?.data?.message));
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
          onSubmit={handleLogin}
        >
          <h1 className="text-4xl py-2 text-center text-teal-600 dark:text-teal-200">
            Welcome Back!
          </h1>
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
            <span className="text-base">Don't Have an Account</span>
            <Link
              to={"/register"}
              className="text-slate-500 text-base hover:underline"
            >
              Register
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

export default Login;
