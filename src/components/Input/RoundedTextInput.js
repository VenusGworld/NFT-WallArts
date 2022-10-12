import React, { useState } from "react";

const RoundedTextInput = ({ placeholder, label, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex flex-col justify-start items-start space-y-2 w-full ]">
      <span className=" text-sm">{label}</span>
      <div className="bg-[#444E66] px-5 py-4 rounded-full w-full relative inline-block border border-[#818895]">
        <input
          placeholder={placeholder}
          defaultValue={value}
          onChange={(e) => {
            setValue(e.value);
          }}
          className="w-full border-none bg-[#444E66] text-white mr-2"
        />
      </div>
    </div>
  );
};

export default RoundedTextInput;
