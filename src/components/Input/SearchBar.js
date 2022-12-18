import React from "react";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="bg-[#444E66] px-5 py-3 rounded-full w-full relative flex items-start">
      <input
        placeholder={placeholder}
        className=" border-none w-auto bg-[#444E66] text-white mr-5"
      />
      <img
        loading="lazy"
        src={process.env.PUBLIC_URL + "/img/search.svg"}
        className="w-5 h-5 inline-block absolute right-2 top-1/2 -translate-y-1/2"
        alt="globe"
      />
    </div>
  );
};

export default SearchBar;
