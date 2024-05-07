import axios from "axios";
import {
  Alert,
  Button,
  FloatingLabel,
  Spinner,
  Textarea,
} from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <h2 className="text-2xl my-1 py-2 text-slate-500">Send a Message</h2>
      <form onSubmit={handleMessage} className="w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <FloatingLabel
            required
            variant="filled"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[27rem] mt-2"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[27rem] mt-2"
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <FloatingLabel
            required
            variant="filled"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[27rem] mt-2"
          />
          <FloatingLabel
            required
            variant="filled"
            label="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200 w-[27rem] mt-2"
          />
        </div>
        <Textarea
          required
          rows={7}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          outline
          gradientDuoTone="greenToBlue"
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-400 my-3 w-full"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Sending...</span>
            </>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;
