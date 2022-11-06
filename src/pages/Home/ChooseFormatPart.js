import React, { useState } from "react";
import { useCategory } from "../../hooks/useCategory";

const ChooseFormatPart = () => {
  const [selectedId, setselectedId] = useState(0);
  const categories = useCategory();
  return (
    <div className="flex sm:flex-row flex-col w-[80%] justify-center sm:justify-between">
      <div className="sm:w-[48%] w-full">
        {categories.isLoading ? (
          <div className="h-96"></div>
        ) : (
          <div className="relative flex flex-col">
            {categories?.data?.data.map((info, i) => {
              return (
                <div
                  className={`flex flex-col space-y-2 text-start mt-6 ${
                    selectedId === i ? "" : ""
                  }`}
                  onClick={() => {
                    setselectedId(i);
                  }}
                  key={i}
                >
                  <span className=" text-2xl">{info.name}</span>
                  <span className=" text-gray-400">{info.description}</span>
                </div>
              );
            })}
            <div
              className={`absolute bg-gradient-to-r from-[#a1a1a100] via-[#715b9f15] to-[#45454500] transition-all duration-100 -translate-y-1 mt-6 w-[70%]`}
              style={{
                height: 100 / categories?.data?.data?.length + "%",
                top: (100 / categories?.data?.data?.length) * selectedId + "%",
              }}
            ></div>
          </div>
        )}
      </div>
      <div className="sm:w-[48%] w-full">
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/home/home_2.png"}
          alt="profile_banner"
          width="100%"
        />
      </div>
    </div>
  );
};

export default ChooseFormatPart;
