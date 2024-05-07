import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button, Modal, Select, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const Appointments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    if (currentUser?.user) {
      fetchAppointments();
    }
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteAppointment = async () => {
    setShowModal(false);
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/appointment/delete/${deleteId}`,
        { withCredentials: true }
      );
      if (data?.success !== true) {
        toast.error(data?.message);
      } else {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== deleteId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl my-3 mx-6 py-3 text-slate-500">Appointments</h2>
      <Table
        hoverable
        className="table-auto overflow-x-scroll w-fit mx-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
      >
        <Table.Head>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Patient
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Date
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Doctor
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Department
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Status
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Visited
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize w-48">
            Delete
          </Table.HeadCell>
        </Table.Head>
        {appointments && appointments?.length > 0
          ? appointments.map((appointment) => (
              <Table.Body key={appointment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-teal-600 dark:text-teal-200 ">
                  <Table.Cell className="capitalize w-48">
                    {`${appointment.firstName} ${appointment.lastName}`}
                  </Table.Cell>
                  <Table.Cell className="capitalize w-48">
                    {appointment.appointment_date.substring(0, 16)}
                  </Table.Cell>
                  <Table.Cell className="capitalize w-48">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</Table.Cell>
                  <Table.Cell className="capitalize w-48">
                    {appointment.department}
                  </Table.Cell>
                  <Table.Cell className="w-48">
                    {currentUser?.user?.role === "Patient" ? (
                      <>{appointment?.status}</>
                    ) : (
                      <Select
                        defaultValue={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="text-slate-500">
                          Pending
                        </option>
                        <option value="Accepted" className="text-slate-500">
                          Accepted
                        </option>
                        <option value="Rejected" className="text-slate-500">
                          Rejected
                        </option>
                      </Select>
                    )}
                  </Table.Cell>
                  <Table.Cell className="w-32">
                    {appointment?.hasVisited === true ? (
                      <GoCheckCircleFill className="text-green-500 text-xl" />
                    ) : (
                      <AiFillCloseCircle className="text-red-600 text-xl" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setDeleteId(appointment._id);
                      }}
                      className="font-medium text-sm text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))
          : "No Appointments Found!"}
      </Table>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Do You Really Want to Delete
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteAppointment}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointments;
