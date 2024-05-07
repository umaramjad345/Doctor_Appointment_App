import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="w-full">
        <img
          src={imageUrl}
          alt="whoweare"
          className="object-cover bg-no-repeat w-full z-10"
        />
      </div>
      <div className="w-full">
        <div>
          <h1 className="text-4xl font-semibold py-2 text-slate-500 my-4">
            Biography
          </h1>
          <h2 className="text-2xl font-medium py-2 text-slate-500">
            Who We Are
          </h2>
        </div>
        <p className="text-justify text-xl font-light py-2 text-slate-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
          consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex magnam
          voluptatum consectetur reprehenderit fugiat recusandae aut similique
          illum natus velit, praesentium nostrum nesciunt. Deleniti, nesciunt
          laboriosam totam iusto!
        </p>
        <p className="text-justify text-xl font-light py-2 my-2 text-slate-500">
          We are working on a MERN STACK PROJECT.
        </p>
        <p className="text-justify text-xl font-light py-2 my-2 text-slate-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          assumenda exercitationem accusamus sit repellendus quo optio dolorum
          corporis corrupti. Quas similique vel minima veniam tenetur obcaecati
          atque magni suscipit laboriosam! Veniam vitae minus nihil cupiditate
          natus provident. Ex illum quasi pariatur odit nisi voluptas illo qui
          ipsum mollitia. Libero, assumenda?
        </p>
        <p className="text-justify text-xl font-light py-2 my-2 text-slate-500">
          Coding is fun!
        </p>
      </div>
    </div>
  );
};

export default Biography;
