import React from "react";

const data = [
  {
    icon: "wallet 1.svg",
    title: "Connect Your Wallet and Select Your NFT",
    desc: "At The NFT Shop, we're proud to support all major wallets. Simply connect yours and choose the NFT digital artwork you'd like to transform into a physical delight",
  },
  {
    icon: "collections 1.svg",
    title: "Choose Your Product and Preview",
    desc: "Once you've chosen the perfect NFT for your at-home gallery, select the finish you'd like for your print, and add any finishing touches using our easy-use online tool.",
  },
  {
    icon: "shipping 1.svg",
    title: "Place Your Order and Get it Delivered",
    desc: "And that's wrap. Once your order is in, We'll pack up your brand new NFT wall art safely and ship it to you as soon as possible",
  },
];

const ProcessPart = () => {
  return (
    <div className="relative flex md:flex-row flex-col w-[80%] justify-center sm:justify-between">
      <div className="md:w-[42%] w-full">
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/home/home_3.png"}
          alt="profile_banner"
          // width="100%"
          className="w-full max-w-md"
        />
      </div>
      <div className="md:w-[52%] w-full text-start">
        <span className=" text-4xl font-bold text-start">Process</span>
        <div>
          {data.map((item, i) => (
            <div key={i} className="flex w-full mt-3 space-x-4">
              <div className=" flex flex-col items-center justify-start">
                <div className=" relative mb-3 w-10">
                  <img
                    loading="lazy"
                    src={process.env.PUBLIC_URL + "/img/home/NoIcon.svg"}
                    alt="icon"
                    className=" w-28"
                  />
                  <span className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[#0b041b] text-xl">
                    {i+1}
                  </span>
                </div>
                <div className=" h-full w-[1px] bg-white"></div>
              </div>
              <div className="flex items-start space-x-4">
                <img
                  loading="lazy"
                  src={process.env.PUBLIC_URL + "/img/home/" + item.icon}
                  alt="icon"
                  width="80px"
                />
                <div className="flex flex-col space-y-2 md:mb-10">
                  <span className=" text-lg">{item.title}</span>
                  <span className=" text-xs text-gray-400 leading-relaxed">{item.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessPart;
