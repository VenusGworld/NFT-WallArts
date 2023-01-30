import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useSelector } from "react-redux";

import { RoundedButtonMD } from "../../components/Input";
import ActivityPart from "./ActivityPart";
import ItemsPart from "./ItemsPart";
import { isConnected, connectedAccount } from "../../store/accountReducer";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ChooseAvatar from "./ChooseAvatar";
import { useSetting } from "../../hooks/useSetting";
import UploadBanner from "./ChooseBanner";

const Profile = ({ onAvatarChanged }) => {
  const [searchParams] = useSearchParams();

  const setting = useSetting();
  const [itemsExpanded, expandItems] = useState(true);
  const is_Connected = useSelector(isConnected);

  const [nfts, setNfts] = useState([]);
  const [user, setUser] = useState({});
  const [editableUserName, seteditableUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [editableBio, seteditableBio] = useState(false);
  const [bio, setBio] = useState("Add Your Bio");
  const [availableEditProfile, setavailableEditProfile] = useState(false)

  // const [pageKey, setpageKey] = useState("");
  const connected_account = useSelector(connectedAccount);
  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  useEffect(() => {
    if (searchParams.get('id')) {
      if (searchParams.get('id') === 'profile_section' && itemsExpanded) {
        expandItems(false)
      }
      let releventDiv = document.getElementById(searchParams.get('id'));
      releventDiv.scrollIntoView({ behavior: "smooth" });
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
          // console.log(res.data.data)
          setUser(res?.data?.data);
        }
      })
      .catch((err) => { });
  };



  const fetchNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(connected_account, {
    }); //'0x5bd0920af6dccae3d4d90c51d6fc7e34583f2314', connected_account);
    setNfts(nfts.ownedNfts);
  };
  console.log()
  return (
    <div className="h-full relative mt-24 bg-[#363F54] w-full">
      <div className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[250px] w-full relative " style={{
        "backgroundImage":
          user.has_custom_banner ?
            "url(" + process.env.REACT_APP_BACKEND_URL + "/images/avatars/" + user?.banner + ")"
            : (setting.isFetched ? (setting.data?.data?.is_banner_default ?
              "url(" + process.env.PUBLIC_URL + "/img/img1 1.png)" :
              "url(" + process.env.REACT_APP_BACKEND_URL + "/images/banner/" + setting.data?.data?.banner + ")") :
              "url(" + process.env.PUBLIC_URL + "/img/img1 1.png)"),
        "backgroundPosition": 'top center',
        "backgroundSize": 'contain',
        "backgroundRepeat": 'no-repeat'
      }}>
        <div className="flex mt-5 ml-[70%] flex-wrap">
          <UploadBanner is_Connected={is_Connected} user={user} onChanged={async () => {
            await fetchUserDataByAddress()
          }} />
          <div className="flex justify-center relative mt-5 z-50">
            <div
              className="relative flex"
              onClick={() => {
                setavailableEditProfile(!availableEditProfile)
              }}
            >
              <div className={`mt-5 text-xs inline-block cursor-pointer hover:opacity-75 rounded-md border opacity-50 ${availableEditProfile ? "border-gray-100 text-gray-100 bg-gray-400 opacity-75 " : "border-gray-400 text-gray-400 bg-gray-600"} p-1`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <span className="inline-block">Edit Profile</span>
              </div>
            </div></div>
        </div>
      </div>

      <div className=" sm:p-20 sm:pt-20 p-15 pt-10 flex flex-col justify-center items-center w-full">
        <div className="relative md:my-5 my-1 w-full">
          <ChooseAvatar is_Connected={is_Connected} user={user} onChanged={() => {
            onAvatarChanged()
          }} availableChange={availableEditProfile} />
          <div className=" text-white md:text-2xl sm:text-xl text-base flex flex-col relative group items-center">
            {availableEditProfile ? <div className={`absolute text-black top-1/2 flex xl:left-[35%] md:left-[25%] -translate-y-1/2 sm:left-[20%] left-[10%] -translate-x-1/2 p-1 transition-all rounded-lg`}
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div> : null}
            <div className="max:w-[80%] relative">
              <input
                className={` bg-[#363f54] overflow-x-auto w-[90%] text-center ${availableEditProfile? "border rounded-md":""}`}
                defaultValue={user.name ? user.name : user.wallet_address && user.wallet_address?.length > 0 ? user.wallet_address : ""}
                disabled={!availableEditProfile}
                onChange={(v) => {
                  if (
                    v?.target.value !==
                      user.wallet_address && user.wallet_address?.length > 0 ? ((user.name ? user.name : user.wallet_address.substring(0, 5) +
                        "..." +
                        user.wallet_address.substring(
                          user.wallet_address.length - 4,
                          user.wallet_address.length))) : ""
                  ) {
                    seteditableUserName(true);
                    setUserName(v?.target.value);
                  } else seteditableUserName(false);
                }}
              />

              {editableUserName && availableEditProfile ? (
                <div
                  className="absolute -right-20 top-1/2 -translate-y-1/2 p-2 rounded-full text-sm border border-gray-500 hover:bg-gray-400 ml-3 cursor-pointer hover:text-black transition-all flex justify-center items-center"
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
                      .catch((err) => { });
                  }}
                >
                  Save
                </div>
              ) : null}
            </div>

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
        <div className=" text-gray-400 sm:text-base text-sm">
          Joined: {new Date(user?.date_joined).toLocaleString()}
        </div>
        <div className=" text-white text-4xl w-3/5 flex justify-center items-center group relative">
          {availableEditProfile ? <div className="text-black absolute top-1/2 -translate-y-1/2 flex  -left-5 -translate-x-1/2 p-1 transition-all rounded-lg">
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
          </div> : null}
          <textarea
            style={{ resize: "none" }}
            className={`bg-[#363f54] h-12 w-full text-center my-1 text-gray-400 text-sm break-words ${availableEditProfile? "border rounded-md":""}`}
            disabled={!availableEditProfile}
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
            value={(user?.bio && user?.bio !== '' && !editableBio) ? user?.bio : bio}
          // defaultValue={user.bio}
          >

            {/* {user.bio} */}
            {/* {(user?.bio && user?.bio !== '') ? user?.bio : "Add Your Bio"} */}
          </textarea>
          {editableBio && availableEditProfile ? (
            <div
              className="absolute -right-20 top-1/2 -translate-y-1/2 p-2 rounded-full border border-gray-500 hover:bg-gray-400 ml-3 text-sm cursor-pointer hover:text-black transition-all flex justify-center items-center"
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
                  .catch((err) => { });
              }}
            >
              Save
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
        <div className="relative sm:my-10 my-3 flex space-x-5" id="profile_section">
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
        {!itemsExpanded && <ActivityPart />}
      </div>
    </div>
  );
};

export default Profile;
