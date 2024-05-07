import { Card } from "flowbite-react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomDot = ({ onClick, active }) => {
  const dotStyles = {
    backgroundColor: active ? "#047857" : "#A2D5D7",
    width: "20px",
    height: "5px",
    margin: "0 5px",
    borderRadius: "2px",
    cursor: "pointer",
  };

  return <span style={dotStyles} onClick={onClick} />;
};

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 3,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="max-w-6xl w-full mx-auto relative py-10">
      <h2 className="text-3xl font-medium my-3 py-3 text-slate-500">
        Departments
      </h2>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={true}
        autoPlaySpeed={1000}
        centerMode={false}
        draggable
        focusOnSelect={false}
        infinite={true}
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        responsive={responsive}
        rewind={true}
        rewindWithAnimation={true}
        rtl={false}
        shouldResetAutoplay
        showDots={true}
        renderDotsOutside={true}
        slidesToSlide={1}
        swipeable={true}
        className=""
        sliderClass=""
        customTransition="transform 1000ms ease 500ms"
        transitionDuration={1000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="container-with-dots" // it is applied on the div containing the list(ul) of carousel items
        itemClass="carousel-custom-item" // it is applied on individual curousel item (list item (li)) it contains your image
        dotListClass="custom-dot-list-style" // it is applied on the dots list not on individual dots
        customDot={<CustomDot />}
        // customNextArrow={<CustomNextArrow />}
        // customPrevArrow={<CustomPrevArrow />}
      >
        {departmentsArray.map((department, index) => {
          return (
            <div
              className="h-96 w-80 rounded-xl border-2 border-slate-500 flex flex-col justify-center items-center gap-4"
              key={index}
            >
              <img
                src={department.imageUrl}
                alt={department.name}
                className="w-72 h-72 rounded-xl"
              />
              <div className="text-xl font-medium text-slate-100 bg-slate-500 rounded-full w-72 m-2 p-2 flex items-center justify-center">
                {department.name}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Departments;
