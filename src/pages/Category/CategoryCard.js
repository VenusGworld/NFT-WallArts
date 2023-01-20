import React from "react";
import { useNavigate } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';

const CategoryCard = ({ img, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[98%] sm:w-[49%] shadow-2xl flex flex-col lg:my-3 md:my-2 sm:my-1 my-1 cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-all"
      onClick={() => {
        // navigate("/customizedArt");
        navigate({
          pathname: "/customizedArt",
          search: `?category=${id}`,
        });
      }}
    >
      <div className="overflow-hidden h-1/2 w-full">
        <img
          alt={name}
          effect="blur"
          className="h-[100%] w-[100%]"
          // height={image.height}
          src={img} // use normal <img> attributes as props
        />
      </div>

      <div className="flex flex-col items-baseline p-5 bg-[#454e61]">
        <div className="py-5 text-2xl xl:text-3xl">{name}</div>
        <div className=" text-start xl:text-lg">{desc}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
