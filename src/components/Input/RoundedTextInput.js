import React, { useState } from "react";

const RoundedTextInput = ({ placeholder, label, defaultValue, onChangeHandle, type }) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  return (
    <div className="flex flex-col justify-start items-start space-y-2 w-full ]">
      <span className=" text-sm">{label}</span>
      <div className="bg-[#444E66] px-5 py-4 rounded-full w-full relative inline-block border border-[#818895]">
        <input
          placeholder={placeholder}
          defaultValue={value}
          type={type?type:'text'}
          onChange={(e) => {
            console.log(type)
            if(type==='email') {
              if (!isValidEmail(e.target.value)) {
                setError('Email is invalid');
              } else {
                setError(null);
              }
            }
              setValue(e.target.value);
              onChangeHandle(e.target.value)
          }}
          className="w-full border-none bg-[#444E66] text-white mr-2"
        />
        
      </div>
      {error && <h2 style={{color: 'red'}} className=' w-full flex justify-center'>{error}</h2>}
    </div>
  );
};

export default RoundedTextInput;
