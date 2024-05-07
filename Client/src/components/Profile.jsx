import {
  Alert,
  Button,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logoutSuccess,
} from "../redux/userSlice.js";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [inputError, setInputError] = useState("");

  const handleAvatar = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(file);
      setAvatarPreview(reader.result);
    };
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("avatar", avatar);

      dispatch(updateStart());
      await axios
        .put(
          `http://localhost:4000/api/v1/user/update/${currentUser?.user?._id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          dispatch(updateSuccess(res?.data));
          setFirstName("");
          setLastName("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      console.log(error);
      dispatch(updateFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `http://localhost:4000/api/v1/user/delete/${currentUser?.user?._id}`,
        { withCredentials: true }
      );
      const data = res.data;
      if (data?.success === false) {
        dispatch(deleteUserFailure(data?.message));
      } else {
        dispatch(deleteUserSuccess(data?.message));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-10">
      <h1 className="my-7 py-2 text-center font-semibold text-3xl text-slate-500 dark:text-teal-200">
        Profile
      </h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        {currentUser?.user?.role === "Patient" ? (
          <div className="w-32 h-32 mx-auto rounded-full bg-slate-500 text-6xl text-slate-100 font-light flex items-center justify-center border-8 border-[lightgray] uppercase">
            {currentUser?.user?.firstName.slice(0, 1)}
          </div>
        ) : (
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              ref={filePickerRef}
              hidden
            />
            <img
              src={
                avatarPreview
                  ? `${avatarPreview}`
                  : currentUser?.user?.avatar
                  ? currentUser?.user?.avatar?.url
                  : "Profile-Picture.png"
              }
              alt="user"
              className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
            />
          </div>
        )}
        <div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <TextInput
              type="text"
              placeholder="First Name"
              defaultValue={currentUser?.user?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full hover:outline-none"
            />
            <TextInput
              type="text"
              placeholder="Last Name"
              defaultValue={currentUser?.user?.lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <TextInput
              type="text"
              placeholder="Email"
              value={currentUser?.user?.email}
              readOnly
              className="w-full hover:outline-none"
            />
            <TextInput
              type="number"
              placeholder="Mobile Number"
              defaultValue={currentUser?.user?.phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <TextInput
              type="number"
              placeholder="NIC"
              value={currentUser?.user?.nic}
              readOnly
              className="w-full hover:outline-none"
            />
            <TextInput
              type={"date"}
              placeholder="Date of Birth"
              defaultValue={currentUser?.user?.dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <Select
              defaultValue={currentUser?.user?.gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full hover:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <TextInput
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <Button
            outline
            gradientDuoTone="greenToBlue"
            type="submit"
            disabled={loading}
            className="w-full hover:outline-none bg-gradient-to-r from-teal-600 via-teal-700 to-teal-400 my-2"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
      <div className="text-red-500 flex justify-between mt-1">
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer text-base"
        >
          Delete Account
        </span>
        <span onClick={handleLogout} className="cursor-pointer text-base">
          Logout
        </span>
      </div>
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      {inputError && (
        <Alert color="failure" className="mt-5">
          {inputError}
        </Alert>
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
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-600 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Do You Really Want to Delete Your Account
            </h3>
            <div className="flex justify-around">
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

export default Profile;
