import React from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CategoryCard = ({ img, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="lg:w-[30vw] sm:w-[90vw] shadow-2xl flex flex-col my-8 cursor-pointer hover:scale-105 hover:drop-shadow-2xl transition-all"
      onClick={() => {
        // navigate("/customizedArt");
        navigate({
          pathname: "/customizedArt",
          search: `?category=${id}`,
        });
      }}
    >
      <LazyLoadImage
          alt={name}
          effect="blur"
          className=" lg:w-[30vw] sm:w-[90vw] lg:h-[20vw] sm:h-[70vw]"
          // height={image.height}
          src={img} // use normal <img> attributes as props
           />
      <div className="flex flex-col items-baseline p-5 bg-[#454e61]">
        <div className="py-5 text-2xl xl:text-3xl">{name}</div>
        <div className=" text-start xl:text-lg">{desc}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
