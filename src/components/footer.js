import React from "react";
import { RoundedButtonSM, RoundedButtonMD, SearchBar } from "./Input";

const Footer = () => {
  return (
    <div className="w-full bottom-0 border-none bg-[#212737]">
      <div
        className="w-[80%] mx-auto text-start text-white"
      >
        <div className="flex md:flex-row flex-col items-center justify-between py-2">
          <div className="md:w-[40%] w-[80%] flex flex-col justify-start flex-1">
            <div className="flex flex-col justify-start">
              <div className="flex flex-col justify-center">
                <img loading='lazy'
                  href={process.env.PUBLIC_URL + "/img/New-Logo 1.png"}
                  alt="logo"
                  className=" inline-block w-80"
                  src={process.env.PUBLIC_URL + "/img/New-Logo 1.png"}
                />
              </div>
              <div className="w-[70%] py-1 content-start">
                <div className="py-1 font-bold">
                  Stay in the NFT WALLARTS
                </div>
                Join our mailing list to stay in the loop with our newest feature
              </div>
              <div className="flex flex-col md:items-center items-start md:flex-row py-2">
                <div className="mr-2 mb-2">
                  <SearchBar placeholder={"Email"} />
                </div>
                <div className="">
                  <RoundedButtonMD
                    text="Signup"
                    onButtonClick={() => {}}
                    active
                  />
                </div>
              </div>
            </div>
            

            <div className="flex items-center justify-start py-2 space-x-2">
              <div className="">
                <RoundedButtonSM text="F" onButtonClick={() => {}} />
              </div>
              <div className="">
                <RoundedButtonSM text="T" onButtonClick={() => {}} />
              </div>
              <div className="">
                <RoundedButtonSM text="S" onButtonClick={() => {}} />
              </div>
            </div>
          </div>
          <div className="flex justify-around flex-1 md:w-fit w-full">
            <div className="">
              <div>Explore</div>
              <div>Stats</div>
              <div>Resources</div>
              <div>Create</div>
            </div>
            <div className="">
              <div>Help</div>
              <div>Contuctus</div>
              <div>Application</div>
              <div>Team</div>
            </div>
            <div className="">
              <div>Help</div>
              <div>Contuctus</div>
              <div>Application</div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-[#71747c]" />
        <div className="flex justify-between py-2">
          <div>@2022.NFT WALLARTS.All rights reserved</div>
          <div>Privacy policy | Terms & conditions</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
