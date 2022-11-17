import React, { useEffect } from "react";
import { useState } from "react";

const RoundedDropDownSelect = ({ list, onChangeHandle, label, value }) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedItem, selectItem] = useState(value>0?value:0);
  useEffect(() => {
    onChangeHandle(list[value>0?value:0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   onChangeHandle(list[0]);
  // }, [])
  return (
    <div
      className={`relative flex flex-col justify-start items-start space-y-2 w-full cursor-pointer ${
        expanded && "overflow-hidden"
      } transition-all`}
    >
      <span className=" text-sm">{label}</span>
      <div
        className={`relative w-full rounded-full cursor-pointer px-7 py-4 ${
          !expanded ? " bg-[#57637C] overflow-hidden " : "  bg-[#4a5367] "
        } border border-[#818895]`}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="flex">
          {list[selectedItem]?.text && list[selectedItem]?.text}
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
            expanded
              ? " -top-[500px] translate-y-0 transition-all h-full "
              : " top-16"
          } z-50 transition-all overflow-y-auto h-40 bg-[#454E61] p-4 text-white absolute -bottom-2 flex flex-col items-start w-full -left-0`}
          style={{
            boxShadow:
              "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)",
          }}
        >
          {list.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                selectItem(i);
                setExpanded(true);
                onChangeHandle(item["value"]);
              }}
              className={`${
                selectedItem === i
                  ? "text-[#D3B789] border-l border-l-gray-400 border-r border-r-gray-400 "
                  : " text-white"
              } p-1 px-3 w-full`}
            >
              {item?.text}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default RoundedDropDownSelect;
