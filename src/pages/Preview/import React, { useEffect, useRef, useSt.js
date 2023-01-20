import React, { useEffect, useRef, useState } from "react";
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

const Profile = () => {
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
          setUser(res?.data?.data);
        }
      })
      .catch((err) => { });
  };
  const myCanvas = useRef();
  useEffect(() => {
    let url = 'https://nft-cdn.alchemy.com/eth-mainnet/05a38bc11e52257d467ec940e5ffad79';
    // loadImgAsBase64(url, (dataURL) => {
    //   console.log(dataURL, "____________")
    //   document.getElementById("msg").innerHTML = dataURL.slice(0,50)+'...';
    // });
    const context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src =
      "https://nft-cdn.alchemy.com/eth-mainnet/05a38bc11e52257d467ec940e5ffad79";
    image.onload = () => {
      context.drawImage(image, 0, 0, 500, 500);
    };
  }, [])

  // function loadImgAsBase64(url, callback) {
  //   let canvas = document.createElement('canvas');
  //   let img = document.createElement('img');
  //   //img.setAttribute('crossorigin', 'anonymous');
  //   img.src = url;
  
  //   img.onload = () => {
  //     canvas.height = img.height;
  //     canvas.width = img.width;
  //     let context = canvas.getContext('2d');
  //     context.drawImage(img, 0, 0);
  //     // console.log("sdfsdfsdf",canvas.())
  //     let dataURL = canvas.toDataURL('image/png');
  //     canvas = null;
  //     callback(dataURL);
  //   };
  // }


  const fetchNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(connected_account, {
    }); //'0x5bd0920af6dccae3d4d90c51d6fc7e34583f2314', connected_account);
    setNfts(nfts.ownedNfts);
  };

  return (
    <div className="h-full relative mt-20 bg-[#363F54] w-full">
<canvas ref={myCanvas} width={500} height={500} />
      <div className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[250px] w-full" style={{
        "backgroundImage":
          setting.isFetched ? setting.data?.is_banner_default ?
            "url(" + process.env.PUBLIC_URL + "/img/img1 1.png)" :
            "url(" + process.env.REACT_APP_BACKEND_URL + "/images/banner/" + setting.data?.data?.banner + ")" :
            "url(" + process.env.PUBLIC_URL + "/img/img1 1.png)",
        "backgroundPosition": 'center',
        "backgroundSize": 'cover',
        "backgroundRepeat": 'no-repeat'
      }}>

      </div>
      <div id="msg"></div>
     
    </div>
  );
};

export default Profile;
