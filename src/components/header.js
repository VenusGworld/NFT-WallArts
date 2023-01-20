import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { main_routes } from "../App";
// import { useCategory } from "../hooks/useCategory";
import ConnectButton from "./ConnectButton";
// import { RoundedButtonMD, RoundedButtonSM, SearchBar } from "./Input";
// import DropDownNavButton from "./Input/DropDownNavButton";

const Header = ({avatarReload}) => {
  const [sidevar, openSidevar] = useState(false);
  const location = useLocation();
  // const categories = useCategory();
  const navigate = useNavigate();
  return (
    <div className=" fixed z-[1001] w-full top-0">
      <div className=" border-none bg-[#221b33] hd-nm border-theme-24 -mx-3 sm:-mx-8 px-3 sm:px-8 p-0">
        <div
          className="flex items-center h-24 p-1 justify-between w-full sm:px-10 px-2 max-w-[1200px] mx-auto"
        >
          <div className="flex items-center w-full sm:px-8 px-2 justify-around space-x-7">
            <div className="ml-10 flex-1">
              <img
                loading="lazy"
                href={process.env.PUBLIC_URL + "/img/logo.svg"}
                alt="logo"
                className=" w-12 cursor-pointer"
                onClick={() => {
                  navigate("/home")
                }}
                src={process.env.PUBLIC_URL + "/img/logo.svg"}
              />
            </div>
            <div className=" flex-1 p-[7px 0px 0 40px] font-medium text-xs text-center md:flex hidden mx-2 items-center">
              {main_routes.map((r) => (
                <Link
                  key={r.key}
                  className={` mx-5 whitespace-nowrap ${
                    location.pathname === r.path
                      ? " text-white border-b-[#D3B789] border-b"
                      : " text-[#ececec99] border-b border-b-[#d3b78900]"
                  }`}
                  to={r.path}
                >
                  {r.title}
                </Link>
              ))}
            </div>

            {/* <div className="sm:inline-block hidden">
                <RoundedButtonMD text="List" onButtonClick={() => {}} active />
              </div>
              <div>
                <img
                  loading="lazy"
                  src={process.env.PUBLIC_URL + "/img/globe_icon.svg"}
                  className="w-5 h-5 mr-2 text-white inline-block"
                  alt="globe"
                />
                <p className=" inline-block text-white">EN</p>
              </div> */}
            <div className=" flex justify-center flex-1">
              <ConnectButton avatarReload={avatarReload}/>
            </div>
            <div className="flex justify-center items-center">
              <span
                className="md:hidden p-1 border-slate-500 border rounded"
                onClick={() => openSidevar(!sidevar)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bar-chart-2 w-6 h-6 text-white transform -rotate-90"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      {sidevar ? (
        <div
          className=" z-[100000] absolute w-full items-center shadow-lg bg-[#3c3c63] md:hidden"
          style={{ boxShadow: "rgb(18 20 32) 0px 0px 10px" }}
        >
          {
            main_routes.map((r, i) => (
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3"
              key={i}
              onClick={() => {
                navigate(r.path)
                openSidevar(false)
              }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-layers"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>{r.title}</span>
          </div>))
          }
          {/* <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-layers"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>Explore</span>
          </div>
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-server"
            >
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
            <span>Top Sold</span>
          </div>
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-server"
            >
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
            <span>List</span>
          </div> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
