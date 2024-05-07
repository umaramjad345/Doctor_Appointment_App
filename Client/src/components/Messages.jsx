import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Modal, Button } from "flowbite-react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";

const Messages = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data?.messages);
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    };
    if (currentUser?.user?.role === "Admin") {
      fetchMessages();
    }
  }, []);

  const handleDeleteMessage = async () => {
    setShowModal(false);
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/message/delete/${idToDelete}`,
        { withCredentials: true }
      );
      if (data?.success !== true) {
        toast.error(data?.message);
      } else {
        toast.success(data?.message);
        setMessages((messages) =>
          messages.filter((message) => message._id !== idToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser?.user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full my-10">
      <h1 className="text-3xl my-3 py-3 mx-6 text-slate-600">Messages</h1>
      <div className="max-w-4xl mx-auto my-4 flex flex-col gap-4">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <Card key={element._id} className="w-full mx-auto rounded-xl">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-slate-500 w-fit flex gap-1 items-center">
                      <FaRegUserCircle />
                      <p className="text-base text-slate-500 capitalize text-nowrap">{`${element?.firstName} ${element?.lastName}`}</p>
                    </div>
                    <div className="text-slate-500 w-fit flex gap-1 items-center">
                      <IoIosMail />
                      <p className="text-base text-slate-500 capitalize text-nowrap">
                        {element.email}
                      </p>
                    </div>
                    <div className="text-slate-500 w-fit flex gap-1 items-center">
                      <FaPhoneVolume />
                      <p className="text-base text-slate-500 capitalize text-nowrap">
                        {element.phone}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-500 flex gap-4 items-center">
                    <BiSolidMessageDetail />
                    <p className="text-base text-slate-500 capitalize">
                      {element.message}
                    </p>
                  </div>
                  <div
                    className="text-slate-500 flex gap-4 items-center justify-end text-xl cursor-pointer"
                    onClick={() => {
                      setShowModal(true);
                      setIdToDelete(element._id);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-lg text-slate-500">No Message Yet!</p>
        )}
      </div>
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
              <Button color="failure" onClick={handleDeleteMessage}>
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

export default Messages;
