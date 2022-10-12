import React from "react";
import {
  RoundedButtonSM,
  RoundedTextInput,
} from "./Input";
import RoundedButtonBG from "./Input/RoundedButton_bg";

const Footer = () => {
  return (
    <div className="w-full bottom-0 border-none bg-[#212737]">
      <div className="w-[80%] mx-auto text-start text-white">
        <div className="flex md:flex-row flex-col items-center justify-between py-2">
          <div className="md:w-[30%] w-[80%] flex flex-col justify-start flex-1">
            <div className="flex flex-col justify-start">
              <div className="flex flex-col justify-center">
                <img
                  loading="lazy"
                  href={process.env.PUBLIC_URL + "/img/New-Logo 1.png"}
                  alt="logo"
                  className=" inline-block w-80 -ml-5"
                  src={process.env.PUBLIC_URL + "/img/New-Logo 1.png"}
                />
              </div>
              <div className=" w-full py-1 content-start text-gray-500 text-ellipsis overflow-hidden">
                <div className="py-1 font-bold text-white">
                  Stay in the NFT WALLARTS
                </div>
                Join our mailing list to stay in the loop with our newest
                feature
              </div>
              <div className="flex flex-col md:items-center items-start md:flex-row py-2">
                <div className="mr-2 mb-2">
                  <RoundedTextInput placeholder="Email" />
                </div>
                <div className="h-full">
                  <RoundedButtonBG
                    text="Signup"
                    onButtonClick={() => {}}
                    active
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start py-2 space-x-2">
              <div className="">
                <RoundedButtonSM
                  icon={
                    <img
                      src={process.env.PUBLIC_URL + "/img/twitter.svg"}
                      className="flex w-full h-full"
                      alt=""
                    />
                  }
                  onButtonClick={() => {}}
                />
              </div>
              <div className="">
                <RoundedButtonSM
                  icon={
                    <img
                      src={process.env.PUBLIC_URL + "/img/facebook.svg"}
                      className="flex w-full h-full"
                      alt=""
                    />
                  }
                  onButtonClick={() => {}}
                />
              </div>
              <div className="">
                <RoundedButtonSM
                  icon={
                    <img
                      src={process.env.PUBLIC_URL + "/img/instagram.svg"}
                      className="flex w-full h-full"
                      alt=""
                    />
                  }
                  onButtonClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-1 md:w-fit w-full  flex-wrap">
            <div className="flex flex-col space-y-5">
              <div>Explore</div>
              <div>Stats</div>
              <div>Resources</div>
              <div>Create</div>
            </div>
            <div className="flex flex-col space-y-5">
              <div>Help</div>
              <div>Contuctus</div>
              <div>Application</div>
              <div>Team</div>
            </div>
            <div className="flex flex-col space-y-10 w-1/3">
              <div className="flex">
                <img
                  src={process.env.PUBLIC_URL + "/img/location.svg"}
                  className="flex mr-5"
                  alt=""
                />
                <span>925 Filbert Street Pennsylvania 18072</span>
              </div>
              <div className="flex">
                <img
                  src={process.env.PUBLIC_URL + "/img/phone.svg"}
                  className="flex mr-5"
                  alt=""
                />
                <span>+45 34 11 44 11</span>
              </div>
              <div className="flex">
                <img
                  src={process.env.PUBLIC_URL + "/img/email.svg"}
                  className="flex mr-5"
                  alt=""
                />
                <span>info@mail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-1 border-t border-[#71747c]" />
        <div className="flex justify-between py-2">
          <div>@2022.NFT WALLARTS.All rights reserved</div>
          <div>Privacy policy | Terms & conditions</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
