import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 py-6 px-4 flex flex-col gap-10">
      <Hero imageUrl={"/about.png"} />
      <Biography imageUrl={"/whoweare.png"} />
    </div>
  );
};

export default AboutUs;
