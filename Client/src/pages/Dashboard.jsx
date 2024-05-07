import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";
import Appointments from "../components/Appointments.jsx";
import AddNewAdmin from "../components/AddNewAdmin.jsx";
import AddNewDoctor from "../components/AddNewDoctor.jsx";
import Doctors from "../components/Doctors.jsx";
import Users from "../components/Users.jsx";
import Messages from "../components/Messages.jsx";
import SideBar from "../components/SideBar.jsx";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");

    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-80">
          <SideBar />
        </div>
        {tab === "profile" && <Profile />}
        {tab === "doctors" && <Doctors />}
        {tab === "add-admin" && <AddNewAdmin />}
        {tab === "add-doctor" && <AddNewDoctor />}
        {tab === "users" && <Users />}
        {tab === "messages" && <Messages />}
        {tab === "appointments" && <Appointments />}
      </div>
    </>
  );
};

export default Dashboard;
