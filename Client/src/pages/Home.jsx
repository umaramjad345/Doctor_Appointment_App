import React from "react";
import MessageForm from "../components/MessageForm.jsx";
import Departments from "../components/Departments.jsx";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 py-6 px-4 flex flex-col gap-10">
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col w-2/3">
          <div>
            <h1 className="text-5xl font-semibold py-4 text-slate-500 my-2">
              City
              <span className="font-light text-5xl text-slate-500">
                Care
              </span>{" "}
              Medical Institute
            </h1>
            <h2 className="text-2xl font-medium py-2 text-slate-500">
              Your Trusted Health Care Partner
            </h2>
          </div>
          <p className="text-start text-xl font-light py-2 my-2 text-slate-500">
            A state-of-the-art facility dedicated to providing healthcare
            services with compassion and expertise.
          </p>
        </div>
        <div className="relative w-3/5 p-2 overflow-hidden">
          <img
            src="/Hero-1.png"
            alt="hero"
            className="absolute object-cover bg-no-repeat w-full z-10 p-2 m-2"
          />
          <span className="">
            <img
              src="/Hero-2.png"
              alt="vector"
              className="opacity-15 w-full bg-no-repeat object-cover"
            />
          </span>
        </div>
      </div>
      <Departments />
      <MessageForm />
    </div>
  );
};

export default Home;
