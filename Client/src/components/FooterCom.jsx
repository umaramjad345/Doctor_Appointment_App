import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const FooterCom = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <Footer container className="border-t-2">
      <div className="max-w-6xl w-full mx-auto">
        <div className="w-full flex items-center justify-between px-2">
          <Link
            to="/"
            className="w-2/5 flex items-center font-bold text-slate-500 py-2"
          >
            <span className="text-4xl overflow-hidden">City</span>
            <span className="text-4xl font-light overflow-hidden">Care</span>
          </Link>
          <div className="w-3/5 flex justify-between">
            <div className="px-4">
              <Footer.Title title="Quick Links" className="text-lg" />
              <Footer.LinkGroup className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  Home
                </Link>
                <Link
                  to="/appointment"
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  Appointment
                </Link>
                <Link
                  to="/about"
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  About
                </Link>
              </Footer.LinkGroup>
            </div>
            <div className="px-4">
              <Footer.Title title="Working Hours" className="text-lg" />
              <Footer.LinkGroup className="flex flex-col gap-2">
                {hours.map((elem) => (
                  <p key={elem.id} className="flex gap-2">
                    <span className="text-base">{elem.day}</span>
                    <span className="text-base">{elem.time}</span>
                  </p>
                ))}
              </Footer.LinkGroup>
            </div>
            <div className="px-4">
              <Footer.Title title="Follow us" className="text-lg" />
              <Footer.LinkGroup className="flex flex-col gap-2">
                <Link
                  to={"#"}
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  LinkedIn
                </Link>
                <Link
                  to={"#"}
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  Github
                </Link>
                <Link
                  to={"#"}
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  Twitter
                </Link>
                <Link
                  to={"#"}
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  Facebook
                </Link>
                <Link
                  to={"#"}
                  className="cursor-pointer hover:underline underline-offset-2 hover:text-blue-600 text-base"
                >
                  Instagram
                </Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="w-full h-1 bg-slate-300 rounded-lg" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="CityCare™" year={2024} className="p-2" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={FaLinkedin} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
