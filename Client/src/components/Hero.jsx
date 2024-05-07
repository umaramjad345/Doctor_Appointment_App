import React from "react";

const Hero = ({ imageUrl }) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="flex flex-col w-full">
        <div>
          <h1 className="text-4xl font-semibold py-2 text-slate-500 my-4">
            CityCare Medical Institute
          </h1>
          <h2 className="text-xl font-medium py-2 text-slate-500">
            Learn More About Us
          </h2>
        </div>
        <p className="text-justify text-xl font-light py-2 my-2 text-slate-500">
          CityCare Medical Institute is a state-of-the-art facility dedicated to
          providing comprehensive healthcare services with compassion and
          expertise. Our team of skilled professionals is committed to
          delivering personalized care tailored to each patient's needs. At
          CityCare, we prioritize your well-being, ensuring a harmonious journey
          towards optimal health and wellness.
        </p>
      </div>
      <div className="relative w-full p-2">
        <img
          src={imageUrl}
          alt="hero"
          className="absolute object-cover bg-no-repeat w-full z-10"
        />
        <span className="">
          <img
            src="/Vector.png"
            alt="vector"
            className="opacity-25 w-full bg-no-repeat object-cover"
          />
        </span>
      </div>
    </div>
  );
};

export default Hero;
