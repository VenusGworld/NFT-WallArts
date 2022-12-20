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
                  className={`flex flex-col space-y-2 text-start mt-6 cursor-pointer ${selectedId === i ? "" : ""
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
              <div className=" w-1 rounded-lg bg-gradient-to-b from-[#582eff] to-[#9260ff] h-[80%] top-1/2 absolute -translate-y-1/2 -left-5" />
            </div>
          </div>
        )}
      </div>
      <div className="sm:w-[48%] w-full">
        <div className="w-full h-full bg-opacity-0 z-10 overflow-hidden relative">
          <div className="relative">
            {
              categories?.data?.data?.map((d, i) => {
                if (selectedId === i) return (<img
                  loading="lazy"
                  key={i}
                  // src={process.env.PUBLIC_URL + "/img/home/home_2.png"}
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${d?.image}`}
                  alt="profile_banner"
                  width="100%"
                // className="top-0 left-0"
                />)
                return null;
              })
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChooseFormatPart;
