import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropDownNavButton = ({ list, title, onChangeHandle }) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full">
      <div
        className={`relative w-full cursor-pointer px-7 py-5 ${
          expanded ? " overflow-hidden " : "  bg-[#363F54]"
        } text-[#ececec99]`}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="flex">
          {title}
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/triangle.svg"}
            alt=""
            className={`absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 transition-all ${
              expanded && " rotate-180"
            }`}
          />
        </div>
      </div>
      {
        <div
          className={` ${
            expanded ? " -top-[500px] translate-y-0 transition-all h-full " : ""
          } z-50 transition-all bg-[#454E61] p-4 text-white absolute -bottom-2 flex flex-col justify-start items-start translate-y-full w-[230px] left-0 ml-5`}
          style={{
            boxShadow:
              "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)",
          }}
        >
          {list.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                // selectItem(i)
                setExpanded(!expanded);
                navigate({
                  pathname: "/customizedArt",
                  search: `?category=${item.link}`,
                });
              }}
              className={`p-1 cursor-pointer`}
            >
              {item?.title}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default DropDownNavButton;
