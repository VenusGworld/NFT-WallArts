import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  useEffect(() => {
    initialFetching();
  }, [])
  const [initialInfo, setInitialInfo] = useState({
    is_payment_test: false,
    is_banner_default: false,
    banner: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    discord: ""
  })
  const initialFetching = async () => {
    const result = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`)
    setInitialInfo(result.data.data)
  }
  const success = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };
  const error = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };
  const [email, setEmail] = useState('')
  return (
    <div className="w-full bottom-0 border-none bg-[#120728]">
      <div className="w-[80%] mx-auto text-start text-white flex flex-col py-10 max-w-[1200px]">
        <div className="flex-col mb-10">
          <div className=" flex flex-wrap w-full justify-between items-center">
            <div className="md:w-2/5 w-full  flex flex-col">
              <span className=" text-4xl">Newsletter and Offers</span>
              <span className=" text-xs text-gray-400">
                We're all about physical art - for digital art's sake. If you
                are too, sign up for our latest news and offers.
              </span>
            </div>
            <div className=" md:w-1/3 sm:min-w-[300px] min-w-[100px] w-full flex ">
              <input className="sm:p-3 p-2 bg-[#27144E] text-white rounded-l-md w-[70%]" placeholder="Enter Your mail"
                onChange={(e) => {

                  setEmail(e.target.value)
                }}
                value={email}
              />
              <div className="sm:p-3 p-2 bg-[#D3B789] text-black hover:bg-[#8d7a5d] cursor-pointer rounded-r-md"
                onClick={async () => {
                  if (/\S+@\S+\.\S+/.test(email))
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/email/`, {
                      email: email
                    }).then(res => {
                      // console.log(res)
                      if(res.status === 201) {
                        setEmail("");
                        success(res.data?.message)
                      }
                    })
                  else error("Your Email is Invalid")
                }}
              >Join Us</div>
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
              href={process.env.PUBLIC_URL + "/img/logo.svg"}
              alt="logo"
              className=" w-12"
              src={process.env.PUBLIC_URL + "/img/logo.svg"}
            />
            <span>
              Chances are if you're an NFT art Collector, you've got some hidden
              masterpieces gathering dust in your crypto wallet
            </span>
          </div>
          <div className="sm:w-1/4 w-3/4 flex flex-wrap space-x-1">
            <Link target="_blank" to={initialInfo?.twitter} className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.PUBLIC_URL + "/img/twitter.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </Link>
            <Link target="_blank" to={initialInfo?.facebook} className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.PUBLIC_URL + "/img/facebook.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </Link>
            <Link target="_blank" to={initialInfo?.instagram} className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.PUBLIC_URL + "/img/instagram.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </Link>
            <Link target="_blank" to={initialInfo?.discord} className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.PUBLIC_URL + "/img/discord.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </Link>
            <Link target="_blank" to={initialInfo?.linkedin} className="bg-[#2e283d] border-[#442f7b] border rounded-full p-2 hover:bg-[#493f64] transition-all cursor-pointer">
              <img
                src={process.env.PUBLIC_URL + "/img/linkedin.svg"}
                alt=""
                className="w-4 h-4 text-white"
              />
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
