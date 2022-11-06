import React from "react";
import { RectButton } from "../../components/Input";
import ChooseFormatPart from "./ChooseFormatPart";

const Home = () => {
  return (
    <div className="h-full relative mt-24 bg-[#0b041b]">
      <div className=" relative w-full">
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/home/home_1.png"}
          alt="profile_banner"
          width="100%"
        />
        <div className=" absolute top-44 flex sm:flex-col flex-row left-[15%] w-1/3 space-y-5">
          <div className="relative w-28">
            <img
              loading="lazy"
              src={process.env.PUBLIC_URL + "/img/home/Vector (3).svg"}
              alt="profile_banner"
              width="100%"
            />
            <span className=" absolute top-1/2 left-1/3 -translate-y-1/2">
              NFTs
            </span>
          </div>
          <div className=" sm:text-5xl text-xl text-start font-bold leading-normal">
            Bring Your{" "}
            <span className="relative text-[#572dff] border border-[#572dff] rounded-md bg-[#b4acbc] z-10 px-1 pt-1">
              NFT
              <span className="absolute left-2 top-2 h-full text-[#572dff00] border border-[#572dff] rounded-md px-1 pt-1 -z-10">
                NFT
              </span>
            </span>{" "}
            Artwork to Life
          </div>
          <div className=" text-start sm:text-base text-xs">
            Chances are if you're an <span>NFT art collector</span>, you've got
            some hidden masterpieces gathering dust in your crypto wallet.
          </div>
          <div className="sm:w-1/2 w-full">
            <RectButton text={"Create My NFT Display"} />
          </div>
        </div>
        {/* body */}
        <div className=" py-12 px-5 flex flex-col text-white items-center space-y-12">
          <div className="flex flex-col space-y-3 items-center mt-24">
            <div className="relative w-40 text-center text-black">
              <img
                loading="lazy"
                src={process.env.PUBLIC_URL + "/img/home/Vector (3).svg"}
                alt="profile_banner"
                width="100%"
              />
              <span className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                PRODUCTS
              </span>
            </div>
            <span className=" text-4xl font-bold">Choose A Format For Your NFT Wall Art</span>
            <span className=" text-xs font-thin text-gray-400">Breathe life into your digital artwork by choosing a format that suits your interior space.</span>
            <span className=" text-xs font-thin text-gray-400">Leave it to us - We'll upscale your NFT to bring you the finest quality print.</span>
          </div>
          <ChooseFormatPart/>
          <div className="sm:w-1/5 w-1/2 text-black">
            <RectButton text={"Create My NFT Display"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
