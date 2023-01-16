import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RectButton } from "../../components/Input";
import ChooseFormatPart from "./ChooseFormatPart";
import PlaceOrderPart from "./PlaceOrderPart";
import ProcessPart from "./ProcessPart";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let target_process = React.createRef();
  let target_product = React.createRef();
  useEffect(() => {
    scrollToTarget(location.pathname === '/products' ? target_product : (location.pathname === '/process' ? target_process : null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const scrollToTarget = (targetRef) => {
    if (targetRef) setTimeout(() => {
      targetRef.scrollIntoView({
        behavior: 'smooth'
      })
    }, 10);
  }
  return (
    <div className="h-full relative mt-24 bg-[#0b041b]">
      <div className=" relative w-full">
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/home/home_1.png"}
          alt="profile_banner"
          className="w-full min-h-[300px]"
        />
        <div className=" absolute md:top-44 sm:top-20 top-5 flex-col md:left-[15%] left-[5%] lg:w-1/3 w-4/5 md:space-y-5 space-y-1">
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
          <div className="xl:text-[70px] lg:text-[60px] md:text-5xl sm:text-4xl text-2xl text-start font-bold leading-loose">
            <span className="inline-block mb-7">Bring Your{" "}
              <span className="relative text-[#572dff] border border-[#572dff] rounded-md bg-[#b4acbc] z-10 px-1 pt-1">
                NFT
                <span className=" absolute left-2 top-2 h-full text-[#572dff00] border border-[#572dff] rounded-md px-1 pt-1 -z-10">
                  NFT
                </span>
              </span>{" "}
            </span>
            <span>{"   "}Artwork to Life</span>
          </div>
          <div className=" text-start sm:text-sm md:text-base lg:text-lg xl:text-2xl text-xs">
            Chances are if you're an <span>NFT art collector</span>, you've got
            some hidden masterpieces gathering dust in your crypto wallet.
          </div>
          <div className="sm:w-1/2 w-full">
            <RectButton text={"Create My NFT Display"} onButtonClick={() => {
              navigate({
                pathname: "/profile",
                search: `?id=${'nfts'}`,
              });
            }} />
          </div>
        </div>
        {/* body */}

        <div className=" md:py-12 sm:py-6 py-2 px-5 flex flex-col text-white items-center md:space-y-12 sm:space-y-6 space-y-2 mx-auto max-w-[1600px]">
          <div ref={ref => { target_product = ref }} className='md:mb-10 mb-5' />
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
            <span className=" md:text-4xl sm:text-3xl text-2xl font-bold">Choose A Format For Your NFT Wall Art</span>
            <span className=" text-xs font-thin text-gray-400">Breathe life into your digital artwork by choosing a format that suits your interior space.</span>
            <span className=" text-xs font-thin text-gray-400">Leave it to us - We'll upscale your NFT to bring you the finest quality print.</span>
          </div>

          <ChooseFormatPart />
          <div ref={ref => { target_process = ref }} className='mb-10' />
          <div className="sm:w-1/5 w-1/2 text-black">
            <RectButton text={"Create My NFT Display"} onButtonClick={() => {
              navigate({
                pathname: "/profile",
                search: `?id=${'nfts'}`,
              });
            }} />
          </div>

          <ProcessPart />

          <PlaceOrderPart />
        </div>
      </div>
    </div>
  );
};

export default Home;
