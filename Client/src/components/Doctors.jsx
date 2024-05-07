import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Doctors = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data?.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!currentUser?.user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl my-3 py-3 mx-4 text-slate-600">
        Registered Doctors
      </h1>
      <div className="flex flex-wrap gap-2 m-4">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <Card className="bg-slate-100 text-slate-600 w-80 rounded-xl hover:shadow-xl transition-all duration-300">
                <img
                  src={element?.avatar && element?.avatar?.url}
                  alt="profile"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-slate-500"
                />
                <div className="text-2xl capitalize font-semibold text-slate-600 text-center">{`${element.firstName} ${element.lastName}`}</div>
                <div className="flex flex-col">
                  <p className="text-base">
                    Email: <span className="text-base">{element.email}</span>
                  </p>
                  <p className="text-base">
                    Phone: <span className="text-base">{element.phone}</span>
                  </p>
                  <p className="text-base">
                    DOB:{" "}
                    <span className="text-base">
                      {element.dob.substring(0, 10)}
                    </span>
                  </p>
                  <p className="text-base">
                    Department:{" "}
                    <span className="text-base">
                      {element.doctorDepartment}
                    </span>
                  </p>
                  <p className="text-base">
                    NIC: <span className="text-base">{element.nic}</span>
                  </p>
                  <p className="text-base">
                    Gender: <span className="text-base">{element.gender}</span>
                  </p>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-lg text-slate-500">No Registered Doctors Found!</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
