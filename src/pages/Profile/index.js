import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useSelector, useDispatch } from "react-redux";

import { RoundedButtonMD, RoundedButtonSM } from "../../components/Input";
import ActivityPart from "./ActivityPart";
import FilterPart from "./FilterPart";
import ItemsPart from "./ItemsPart";
import { connect, isConnected, setChain, connectedAccount } from "../../store/accountReducer";
// import { ethPrice } from "../../store/infoReducer";

// export const Items = [
//   {
//     img: "image 4.png",
//     name: "Aui dolorem eum",
//     like: "243",
//     auction: true,
//     highestBid: 2.5,
//     endsIn: "02:23:49:01",
//   },
//   {
//     img: "image 16.png",
//     name: "Annoyances accepted",
//     like: "79",
//     sale: true,
//     price: 3,
//     sold: "3/5",
//   },
//   { img: "image 19.png", name: "Facere possimus", like: "320" },
//   {
//     img: "image 16.png",
//     name: "Lorem Ipsume",
//     like: "3",
//     sale: true,
//     price: 3,
//     sold: "3/5",
//   },
//   {
//     img: "image 19.png",
//     name: "Aui dolorem eum",
//     like: "11",
//     auction: true,
//     highestBid: 2.5,
//     endsIn: "02:23:49:01",
//   },
//   { img: "image 19.png", name: "Facere possimus", like: "320" },
//   {
//     img: "image 16.png",
//     name: "Lorem Ipsume",
//     like: "3",
//     sale: true,
//     price: 3,
//     sold: "3/5",
//   },
//   {
//     img: "image 4.png",
//     name: "Aui dolorem eum",
//     like: "243",
//     auction: true,
//     highestBid: 2.5,
//     endsIn: "02:23:49:01",
//   },
//   {
//     img: "image 16.png",
//     name: "Annoyances accepted",
//     like: "79",
//     sale: true,
//     price: 3,
//     sold: "3/5",
//   },
// ];

const Profile = () => {
  const [filterExpanded, expandFilter] = useState(false);
  const [itemsExpanded, expandItems] = useState(true);
  const is_Connected = useSelector(isConnected);
  const [nfts, setNfts] = useState([])
  // const [pageKey, setpageKey] = useState("");
  const connected_account = useSelector(connectedAccount);
  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_MAINNET
  }
  

  const alchemy = new Alchemy(config);

  useEffect(() => {
    if(is_Connected) fetchNFTs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_Connected])
    //fetchNFTs();
  // }, [])

  const fetchNFTs = async() => {
    const nfts = await alchemy.nft.getNftsForOwner(connected_account, {//("0x69f0b8c5e94f6b64d832b7d9b15f3a88cb2f6f4b", {
      pageSize: 9,
    })//connected_account);
    
    setNfts(nfts.ownedNfts);
  }
  
  return (
    <div className="h-full relative mt-20 bg-[#363F54]">
      <img
        loading="lazy"
        src={process.env.PUBLIC_URL + "/img/img1 1.png"}
        alt="profile_banner"
        width="100%"
      />
      <div className=" p-20 flex flex-col justify-center items-center">
        <div className=" rounded-full bg-[#00AEEF] border-4 border-white p-10 -mt-36">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/sandbox_mark.svg"}
            alt=""
            className=" w-24 h-24 scale-125"
          />
        </div>
        <div className="relative my-5">
          <div className=" text-white text-4xl">The Sandbox</div>
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/verified_icon.svg"}
            alt=""
            className=" absolute w-9 h-9 top-0 sm:-right-24 -right-10"
          />
        </div>
        <div className=" text-gray-400">
          Wallet link : 1GVY5eZvtc5bA6EFEGnpq
        </div>
        <div className=" w-3/5 my-6 text-gray-400 text-sm break-words">
          Sandbox LAND is currently undergoing a migration to a new contract. In
          order to benefit from all future LAND features, please migrate to the
          new contract. How to do it and to learn more, please visit:
          https://www.sandbox.game/en/me/migration/
        </div>
        <div className=" w-fit bg-[#313949] flex text-white rounded-full md:px-16 py-2 px-10">
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className=" text-3xl text-white">4,870</div>
            <div className="text-gray-400">Items</div>
          </div>
          <div className="mx-6 border bg-white border-white flex justify-center items-center"></div>
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="flex text-3xl text-white">
              <img
                loading="lazy"
                src={process.env.PUBLIC_URL + "/img/eth_icon.svg"}
                alt=""
                className=" inline-block w-8 h-8"
              />
              110.3K
            </div>
            <div className="text-gray-400">Total Volume</div>
          </div>
        </div>
        <div className="relative my-10 flex space-x-5">
          <RoundedButtonMD
            text="Items"
            onButtonClick={() => {
              expandItems(true);
            }}
            active={itemsExpanded}
          />
          <RoundedButtonMD
            text="Activity"
            onButtonClick={() => {
              expandItems(false);
            }}
            active={!itemsExpanded}
          />
          <div className=" absolute md:-right-24 -right-10">
            <RoundedButtonSM
              icon={
                <img
                  loading="lazy"
                  src={process.env.PUBLIC_URL + "/img/filter_icon.svg"}
                  className="w-3 h-3 text-black inline-block"
                  alt="filter"
                />
              }
              onButtonClick={() => {
                expandFilter(!filterExpanded);
              }}
              active={filterExpanded}
            />
          </div>
        </div>
        {filterExpanded && <FilterPart />}
        {itemsExpanded && <ItemsPart Items={nfts} />}
        {!itemsExpanded && <ActivityPart />}
      </div>
    </div>
  );
};

export default Profile;
