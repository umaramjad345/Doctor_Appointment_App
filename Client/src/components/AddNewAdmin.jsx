import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Select, Spinner, TextInput } from "flowbite-react";

const AddNewAdmin = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

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

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("avatar", avatar);

      await axios
        .post("http://localhost:4000/api/v1/user/admin/addnew", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success(res?.data?.message);
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
      toast.error(error.response.data.message);
    }
  };

  if (!currentUser?.user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-10">
      <h2 className="text-slate-500 text-2xl mx-4 my-6 text-center">
        Add New Admin
      </h2>
      <form onSubmit={handleAddNewAdmin} className="flex flex-col gap-4">
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <input
            type="file"
            onChange={handleAvatar}
            ref={filePickerRef}
            hidden
          />
          <img
            src={avatarPreview ? `${avatarPreview}` : "/Profile-Picture.png"}
            alt="Doctor Avatar"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <TextInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full hover:outline-none"
            />
            <TextInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <TextInput
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full hover:outline-none"
            />
            <TextInput
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <TextInput
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="w-full hover:outline-none"
            />
            <TextInput
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full hover:outline-none"
            />
          </div>
          <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-lg">
            <Select
              value={gender}
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
              value={password}
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
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Register New Admin"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAdmin;
