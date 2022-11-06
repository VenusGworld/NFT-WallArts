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
                  className={`flex flex-col space-y-2 text-start mt-6 cursor-pointer ${
                    selectedId === i ? "" : ""
                  }`}
                  onClick={() => {
                    setselectedId(i);
                  }}
                  key={i}
                >
                  <span className=" text-xl">{info.name}</span>
                  <span className=" text-gray-400 text-xs">{info.description}</span>
                </div>
              );
            })}
            <div
              className={`absolute bg-gradient-to-r from-[#a1a1a100] via-[#715b9f38] to-[#45454500] transition-all duration-300 ease-in-out delay-[0] -translate-y-1 mt-6 w-[85%]`}
              style={{
                height: 100 / categories?.data?.data?.length + "%",
                top: (100 / categories?.data?.data?.length) * selectedId + "%",
              }}
            >
              <div className=" w-1 rounded-lg bg-gradient-to-b from-[#582eff] to-[#9260ff] h-[80%] top-1/2 absolute -translate-y-1/2 -left-5"/>
            </div>
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
