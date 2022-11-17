import React from "react";

const Footer = () => {
  return (
    <div className="w-full bottom-0 border-none bg-[#120728]">
      <div className="w-[80%] mx-auto text-start text-white flex flex-col py-10">
        <div className="flex-col mb-10">
          <div className=" flex w-full justify-between">
            <div className=" w-2/5 flex flex-col">
              <span className=" text-4xl">Newsletter and Offers</span>
              <span className=" text-xs text-gray-400">
                We're all about physical art - for digital art's sake. If you
                are too, sign up for our latest news and offers.
              </span>
            </div>
            <div className=" w-1/3">
              <div></div>
            </div>
          </div>
          <div
            className={`bg-gradient-to-r from-[#150933] via-[#4f29e5] to-[#150933] my-4 w-full`}
            style={{
              height: "1px",
            }}
          />
        </div>
        <div className="flex sm:flex-row flex-col items-center space-y-2 sm:space-y-0 sm:justify-between sm:items-end">
          <div className="sm:w-1/4 w-3/4 flex flex-col space-y-2">
            <img
              loading="lazy"
              href={process.env.REACT_APP_BACKEND_URL + "/client/img/logo.svg"}
              alt="logo"
              className=" w-12"
              src={process.env.REACT_APP_BACKEND_URL + "/client/img/logo.svg"}
            />
            <span>
              Chances are if you're an NFT art Collector, you've got some hidden
              masterpieces gathering dust in your crypto wallet
            </span>
          </div>
          <div className="sm:w-1/4 w-3/4 flex flex-wrap space-x-1">
            <div className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + "/client/img/twitter.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </div>
            <div className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + "/client/img/facebook.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </div>
            <div className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + "/client/img/instagram.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </div>
            <div className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + "/client/img/discord.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </div>
            <div className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + "/client/img/linkedin.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </div>
          </div>
          <div className="sm:w-1/4 w-3/4">
            <span className=" text-sm">Navigation</span>
            <div className="flex space-x-2 text-xs text-gray-300 flex-wrap font-mono">
              <span>Home</span>
              <span>Service</span>
              <span>Process</span>
              <span>Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
