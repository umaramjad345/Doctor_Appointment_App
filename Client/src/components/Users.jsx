import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/userSlice.js";
import { toast } from "react-toastify";
import axios from "axios";

const Users = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/getusers",
          { withCredentials: true }
        );
        if (data.success === true) {
          setUsers(data?.users);
          if (data?.users?.length < 9) {
            setShowMore(false);
          }
        }
        toast.success(data?.message);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    if (currentUser?.user?.role === "Admin") {
      fetchUsers();
    }
  }, [currentUser?.user?._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/user/getusers?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data?.users]);
        if (data?.users?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/user/delete/${userIdToDelete}`,
        {
          withCredentials: true,
        }
      );
      if (data?.success !== true) {
        toast.error(data?.message);
      } else {
        setUsers((users) =>
          users.filter((user) => user._id !== userIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl my-3 mx-6 py-3 text-slate-500">Patients</h2>
      {currentUser?.user?.role === "Admin" && users.length > 0 ? (
        <>
          <Table
            hoverable
            className="table-auto overflow-x-scroll w-fit mx-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
          >
            <Table.Head>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                Profile
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                Email
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                Phone
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                NIC
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-600 text-slate-100 text-lg font-normal capitalize">
                Delete
              </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-teal-600 dark:text-teal-200 ">
                  <Table.Cell>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-600 text-slate-100 text-xl uppercase">
                      {user?.firstName.slice(0, 1)}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="capitalize">
                    {`${user?.firstName} ${user?.lastName}`}
                  </Table.Cell>
                  <Table.Cell>{user?.email}</Table.Cell>
                  <Table.Cell>{user?.phone}</Table.Cell>
                  <Table.Cell>{user?.nic}</Table.Cell>
                  <Table.Cell>{user?.role}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-sm text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p className="text-lg text-slate-500">You Have No Users Yet!</p>
      )}
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
              <Button color="failure" onClick={handleDeleteUser}>
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

export default Users;
