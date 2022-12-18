import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const RoundedPhoneNumberInput = ({ placeholder, label, defaultValue, onChangeHandle }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex relative flex-col space-y-2 w-full cursor-pointer items-start justify-start">
      <span className=" text-sm">{label}</span>
      <PhoneInput
      withCountryCallingCode
      smartCaret
      focusInputOnCountrySelection
      placeholder="Enter phone number"
      value={value}
      onChange={e => {onChangeHandle(e); setValue(e)}}/>
      {/* <div
        className="flex flex-col justify-start items-start space-y-2 w-full cursor-pointer"
        onClick={() => {
          setExpanded(!expanded);
        }}
        ref={ref}
      >
        
        <div className="bg-[#444E66] px-5 py-3 rounded-full w-full relative border border-[#818895] flex space-x-2">
          <div className="flex justify-center items-center space-x-2">
            <div>{NumberList[selectedItem]["flag"]}</div>
            <span>+{NumberList[selectedItem]["prefix"]}</span>
          </div>
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/triangle.svg"}
            alt=""
            className={`absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 transition-all ${
              expanded && " rotate-180"
            }`}
          />
          <input
            placeholder={placeholder}
            defaultValue={value}
            onChange={(e) => {
              setValue(e.target.value);
              onChangeHandle(NumberList[selectedItem]["prefix"]+e.target.value)
            }}
            style={{WebkitAppearance: 'none'}}
            type='Number'
            className=" overflow-hidden pl-2 border-l border-[#818895] bg-[#444E66] text-white mr-2"
          />
        </div>
      </div>
      {
        <div
          className={` ${
            expanded
              ? " -top-[500px] translate-y-0 transition-all h-full hidden duration-200"
              : ""
          } z-50 transition-all bg-[#454E61] p-4 text-white absolute -bottom-2 flex flex-col translate-y-full w-full -left-0`}
          style={{
            boxShadow:
              "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)",
          }}
        >
          {NumberList.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                selectItem(i);
                onChangeHandle(NumberList[i]["prefix"]+''+value)
                // onChangeHandle(item['value'])
              }}
              className={`${
                selectedItem === i ? "text-[#D3B789]" : " text-white"
              } p-1 cursor-pointer`}
            >
              <div className="flex justify-between items-center space-x-2">
                <div>{item["flag"]}</div>
                <span>+{item["prefix"]}</span>
              </div>
            </div>
          ))}
        </div>
      } */}
    </div>
  );
};

export default RoundedPhoneNumberInput;
