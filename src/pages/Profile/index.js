import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useSelector } from "react-redux";

import { RoundedButtonMD, RoundedButtonSM } from "../../components/Input";
import ActivityPart from "./ActivityPart";
import FilterPart from "./FilterPart";
import ItemsPart from "./ItemsPart";
import { isConnected, connectedAccount } from "../../store/accountReducer";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ChooseAvatar from "./ChooseAvatar";

const Profile = () => {
  const [searchParams] = useSearchParams();

  const [filterExpanded, expandFilter] = useState(false);
  const [itemsExpanded, expandItems] = useState(true);
  const is_Connected = useSelector(isConnected);
  
  const [nfts, setNfts] = useState([]);
  const [user, setUser] = useState({});
  const [editableUserName, seteditableUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [editableBio, seteditableBio] = useState(false);
  const [bio, setBio] = useState("Add Your Bio");

  
  // const [pageKey, setpageKey] = useState("");
  const connected_account = useSelector(connectedAccount);
  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  useEffect(() => {
    if(searchParams.get('id')) {
      if(searchParams.get('id') === 'profile_section' && itemsExpanded) {
        expandItems(false)
      }
      let releventDiv = document.getElementById(searchParams.get('id'));
      releventDiv.scrollIntoView({behavior: "smooth"});
    }

    if (is_Connected) {
      fetchNFTs();
      fetchUserDataByAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_Connected, connected_account]);
  //fetchNFTs();
  // }, [])

  const fetchUserDataByAddress = async () => {
    // console.log('connected_account', connected_account)
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/`, {
      wallet_address: connected_account
    })
    // axios
    //   .get(
    //     `${process.env.REACT_APP_BACKEND_URL}/api/user/address/${connected_account}`
    //   )
      .then((res) => {
        // console.log("res", res);
        if (res.status === 200) {
          setUser(res?.data?.data);
        }
      })
      .catch((err) => {});
  };

  

  const fetchNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(connected_account, {
    }); //connected_account);
    console.log(nfts);
    setNfts(nfts.ownedNfts);
  };

  return (
    <div className="h-full relative mt-20 bg-[#363F54]">
      <img
        loading="lazy"
        src={process.env.PUBLIC_URL + "/img/img1 1.png"}
        alt="profile_banner"
        width="100%"
      />
      
      <div className=" p-20 flex flex-col justify-center items-center">
      
        <div className="relative my-5">
        <ChooseAvatar is_Connected={is_Connected} user={user}/>
          <div className=" text-white text-4xl flex relative group items-center">
            <div className="absolute -top-8 hidden group-hover:flex left-1/2 -translate-x-1/2 p-1 bg-black transition-all rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            
            <input
              className=" bg-[#363f54] overflow-x-auto w-fit text-center"
              defaultValue={user.name ? user.name : user.wallet_address && user.wallet_address?.length>0?(user.wallet_address.substring(0, 5) +
             "..." +
             user.wallet_address.substring(
               user.wallet_address.length - 4,
               user.wallet_address.length)):""}
              onChange={(v) => {
                if (
                  v?.target.value !==
                  user.wallet_address && user.wallet_address?.length>0?((user.name ? user.name : user.wallet_address.substring(0, 5) +
             "..." +
             user.wallet_address.substring(
               user.wallet_address.length - 4,
               user.wallet_address.length))):""
                ) {
                  seteditableUserName(true);
                  setUserName(v?.target.value);
                } else seteditableUserName(false);
              }}
            />

            {editableUserName ? (
              <div
                className=" p-2 rounded-full hover:bg-gray-400 ml-3 cursor-pointer hover:text-black transition-all flex justify-center items-center"
                onClick={async () => {
                  let formData = new FormData();
                  formData.append("name", userName);
                  await axios
                    .post(
                      `${process.env.REACT_APP_BACKEND_URL}/api/user/update/${user?._id}`,
                      { name: userName }
                    )
                    .then((res) => {
                      console.log("res", res);
                      if (res.status === 201) {
                        seteditableUserName(false);
                        setUser(res?.data);
                      }
                    })
                    .catch((err) => {});
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>{" "}
              </div>
            ) : null}
          </div>
          {/* <img
            loading="lazy"
            src={
              process.env.PUBLIC_URL + "/img/verified_icon.svg"
            }
            alt=""
            className=" absolute w-9 h-9 top-0 sm:-right-24 -right-10"
          /> */}
        </div>
        <div className=" text-gray-400">
          Joined: {new Date(user?.date_joined).toLocaleString()}
        </div>
        <div className=" text-white text-4xl w-3/5 flex justify-center items-center relative group">
          <div className="absolute -top-8 hidden group-hover:flex left-1/2 -translate-x-1/2 p-1 bg-black transition-all rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <textarea
            style={{ resize: "none" }}
            className="bg-[#363f54] h-12 w-full text-center my-1 text-gray-400 text-sm break-words"
            onChange={(v) => {
              if (
                v?.target.value !== user.bio
              ) {
                seteditableBio(true);
                setBio(v?.target.value);
              } else seteditableBio(false);
              // console.log(editableBio);
            }}
            title='Bio'
            value= {(user?.bio && user?.bio !== '' && !editableBio) ? user?.bio : bio}
            defaultValue={user.bio}
          >
          
            {/* {user.bio} */}
            {/* {(user?.bio && user?.bio !== '') ? user?.bio : "Add Your Bio"} */}
          </textarea>
          {editableBio ? (
              <div
                className=" p-2 rounded-full hover:bg-gray-400 ml-3 cursor-pointer hover:text-black transition-all flex justify-center items-center"
                onClick={async () => {
                  await axios
                    .post(
                      `${process.env.REACT_APP_BACKEND_URL}/api/user/update/${user?._id}`,
                      { bio: bio }
                    )
                    .then((res) => {
                      console.log("res", res);
                      if (res.status === 201) {
                        seteditableBio(false);
                        setUser(res?.data);
                      }
                    })
                    .catch((err) => {});
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>{" "}
              </div>
            ) : null}
        </div>
        {/* <div className=" w-fit bg-[#313949] flex text-white rounded-full md:px-16 py-2 px-10">
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className=" text-3xl text-white">{nfts.length}</div>
            <div className="text-gray-400">Items</div>
          </div>
          <div className="mx-6 border bg-white border-white flex justify-center items-center"></div>
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="flex text-3xl text-white">
              <img
                loading="lazy"
                src={
                  process.env.PUBLIC_URL + "/img/eth_icon.svg"
                }
                alt=""
                className=" inline-block w-8 h-8"
              />
              110.3K
            </div>
            <div className="text-gray-400">Total Volume</div>
          </div>
        </div> */}
        <div className="relative my-10 flex space-x-5" id="profile_section">
          <RoundedButtonMD
            text="NFTs"
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
          <div className=" absolute md:-right-24 -right-10" id="nfts">
            {/* <RoundedButtonSM
              icon={
                <img
                  loading="lazy"
                  src={
                    process.env.PUBLIC_URL + "/img/filter_icon.svg"
                  }
                  className="w-3 h-3 text-black inline-block"
                  alt="filter"
                />
              }
              onButtonClick={() => {
                expandFilter(!filterExpanded);
              }}
              active={filterExpanded}
            /> */}
          </div>
        </div>
        {/* {filterExpanded && <FilterPart />} */}
        {itemsExpanded && <ItemsPart Items={nfts} />}
        {!itemsExpanded && <ActivityPart  />}
      </div>
    </div>
  );
};

export default Profile;
