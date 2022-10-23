import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ img, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="lg:w-[45%] sm:w-[90%] shadow-2xl flex flex-col my-8 cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-all"
      onClick={() => {
        // navigate("/customizedArt");
        navigate({
          pathname: "/customizedArt",
          search: `?category_id=${id}`,
        });
      }}
    >
      <img
        loading="lazy"
        alt="categorycard"
        src={img}
        className=" w-full h-full"
      />
      <div className="flex flex-col items-baseline p-5 bg-[#454e61]">
        <div className="py-5 text-2xl xl:text-3xl">{name}</div>
        <div className=" text-start xl:text-lg">{desc}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
