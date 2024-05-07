import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser, HiUserAdd } from "react-icons/hi";
import {
  FaRegUserCircle,
  FaRegUser,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/userSlice";

const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(logoutSuccess(res?.data?.message));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <Sidebar className="w-full md:w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={FaRegUserCircle}
              label={
                <span className="text-sm">
                  {currentUser?.user?.role === "Admin"
                    ? "Admin"
                    : currentUser?.user?.role === "Doctor"
                    ? "Doctor"
                    : "User"}
                </span>
              }
              labelColor="dark"
              as="div"
            >
              <span className="text-lg">Profile</span>
            </Sidebar.Item>
          </Link>
          {currentUser?.user?.role === "Admin" && (
            <Link to={"/dashboard?tab=add-admin"}>
              <Sidebar.Item
                icon={HiUserAdd}
                active={tab === "add-admin"}
                as="div"
                className="text-sm"
              >
                <span className="text-lg">Add New Admin</span>
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.user?.role === "Admin" && (
            <Link to={"/dashboard?tab=add-doctor"}>
              <Sidebar.Item
                icon={FaRegUser}
                active={tab === "add-doctor"}
                as="div"
                className="text-sm"
              >
                <span className="text-lg">Add New Doctor</span>
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.user?.role === "Admin" && (
            <Link to={"/dashboard?tab=doctors"}>
              <Sidebar.Item
                icon={HiUser}
                active={tab === "doctors"}
                as="div"
                className="text-sm"
              >
                <span className="text-lg">Doctors</span>
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.user?.role === "Admin" && (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
                icon={FaUsers}
                active={tab === "users"}
                as="div"
                className="text-sm"
              >
                <span className="text-lg">Users</span>
              </Sidebar.Item>
            </Link>
          )}
          <Link to={"/dashboard?tab=appointments"}>
            <Sidebar.Item
              icon={FaCalendarAlt}
              active={tab === "appointments"}
              as="div"
              className="text-sm"
            >
              <span className="text-lg">
                {currentUser?.user?.role === "Patient"
                  ? "My Appointments"
                  : "Appointments"}
              </span>
            </Sidebar.Item>
          </Link>
          {currentUser?.user?.role === "Admin" && (
            <Link to={"/dashboard?tab=messages"}>
              <Sidebar.Item
                icon={MdForwardToInbox}
                active={tab === "messages"}
                label={<span className="text-sm">3</span>}
                as="div"
                className="text-sm"
              >
                <span className="text-lg">Masseges</span>
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleLogout}
            as="div"
            className="cursor-pointer"
          >
            <span className="text-lg">Logout</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
