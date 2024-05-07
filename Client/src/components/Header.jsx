import React from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/userSlice.js";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const path = useLocation.path;

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Navbar className="border-b-2 w-full">
      <Link
        to="/"
        className="flex items-center text-2xl font-bold text-slate-500 my-1 py-2"
      >
        <span className="text-3xl overflow-hidden">City</span>
        <span className="text-3xl font-light overflow-hidden">Care</span>
      </Link>

      <div className="flex items-center justify-between gap-4 md:order-2">
        {currentUser?.user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              currentUser?.user?.role === "Patient" ? (
                <div className="w-10 h-10 rounded-full bg-slate-500 text-slate-100 text-2xl flex items-center justify-center uppercase">
                  {currentUser?.user?.firstName.slice(0, 1)}
                </div>
              ) : (
                <img
                  src={
                    currentUser?.user?.avatar
                      ? `${currentUser?.user?.avatar?.url}`
                      : "/Profile-Picture.png"
                  }
                  alt="profile picture"
                  className="w-12 h-12 rounded-full mx-auto"
                />
              )
            }
            className="rounded-xl bg-blue-100 z-20"
          >
            <Dropdown.Header className="text-slate-500">
              <span className="block text-sm font-medium capitalize">{`${currentUser?.user?.firstName} ${currentUser?.user?.lastName}`}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser?.user?.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item className="text-slate-500 text-base">
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleLogout}
              className="text-slate-500 text-base"
            >
              LogOut
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button outline gradientDuoTone="greenToBlue">
              LogIn
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={path === "/"}
          as="div"
          className="text-slate-500 text-lg"
        >
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/appointment"}
          as="div"
          className="text-slate-500 text-lg"
        >
          <Link to={"/appointment"}>Appointment</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as="div"
          className="text-slate-500 text-lg"
        >
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
