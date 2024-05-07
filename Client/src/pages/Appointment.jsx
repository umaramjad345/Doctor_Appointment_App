import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 py-6 px-4 flex flex-col gap-10">
      <Hero imageUrl={"/signin.png"} />
      <AppointmentForm />
    </div>
  );
};

export default Appointment;
