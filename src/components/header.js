import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../App";
import { Link } from "react-router-dom";

const Header = () => {
  const [sidevar,openSidevar] = useState(false);
  const [timer, setTimer] = useState('00:00:00');
  const location = useLocation();
  const Ref = useRef(null);
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
  
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('24:00:00');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 3600*24*40);
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className=" fixed z-[1001] w-full">
      <div className=" border-none bg-[#262935] hd-nm border-theme-24 -mx-3 sm:-mx-8 px-3 sm:px-8 p-0">
        <div
          className="top-bar-boxed flex items-center h-16 p-1"
          style={{
            boxShadow: "0px 4px 6px #3e46725e",
            background: "linear-gradient(to right, #515874 0%, #363945 100%)",
          }}
        >
          <div className="-intro-x">
            <img
              href={process.env.PUBLIC_URL + "/avarice_logo_1.png"}
              alt="AVC Tokens"
              className=" w-44 h-10"
              src={process.env.PUBLIC_URL + "/avarice_logo_1.png"}
              style={{ filter: "drop-shadow(0px 0px 3px #120f275e)" }}
            />
          </div>
          <div className=" w-full items-center justify-between">
            <div className="flex md:justify-between items-center w-full px-8 justify-end">
              <div className="p-[7px 0px 0 40px] font-medium text-lg text-center md:flex hidden">
                {routes.map((r) => (
                  <Link key={r.key} className={`t-pp pg_tt_auction ${location.pathname === r.path?' text-white':' text-[#ececec99]'}`} to={r.path}>
                  { r.title }
                  </Link>
                  ))}
                {/* <a
                  className="t-pp pg_tt_staking"
                  href="staking"
                  style={{ color: 'white'}}
                >
                  Staking
                </a>
                <a className="t-pp pg_tt_auction" href="lobby">
                  Lobby
                </a>
                <a className="t-pp pg_tt_buyandsell" href="buyandsell">
                  Buy & Sell
                </a>
                <a className="t-pp pg_tt_faq" href="faq">
                  FAQ
                </a>
                <a className="t-pp pg_tt_faq" href="tokentranfer">
                  Tokens Transfer
                </a> */}
                {/* <div className="pg_sl_r h-1 w-16 bg-[#00dfb2] mt-2 opacity-0">
                  
                </div> */}
              </div>
              <div className="flex justify-center items-center">
              <div
                style={{
                  background: "#2c303d",
                  height: "38px",
                  borderRadius: "6px",
                  padding: "2px 0px 0px 10px",
                  border: "3px solid #42527178",
                  color: "#c5d6f3",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                <span className="day-end-in pr-2 flex space-x-1">
                  <span className="md:flex hidden">Ends In 40Days</span> 
                  <span>{timer}</span>
                </span>
              </div>
              <span className="md:hidden p-1 border-slate-500 border rounded" onClick={() => openSidevar(!sidevar)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2 w-6 h-6 text-white transform -rotate-90"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </span>
            </div>
            </div>
          </div>
        </div>
      </div>
      {sidevar?
        <div className=" z-[100000] absolute w-full items-center shadow-lg bg-[#3c3c63] md:hidden"
          style={{boxShadow: 'rgb(18 20 32) 0px 0px 10px'}}
        >
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span>Staking</span> 
          </div>
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            <span>Auction Lobbies</span> 
          </div>
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shuffle"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
            <span>Buy and Sell</span> 
          </div>
          <div className=" w-full border-b-2 border-[#93939330] mx-auto h-12 text-white flex px-5 items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="white" height="24" viewBox="0 0 320 512"><path d="M204.3 32.01H96c-52.94 0-96 43.06-96 96c0 17.67 14.31 31.1 32 31.1s32-14.32 32-31.1c0-17.64 14.34-32 32-32h108.3C232.8 96.01 256 119.2 256 147.8c0 19.72-10.97 37.47-30.5 47.33L127.8 252.4C117.1 258.2 112 268.7 112 280v40c0 17.67 14.31 31.99 32 31.99s32-14.32 32-31.99V298.3L256 251.3c39.47-19.75 64-59.42 64-103.5C320 83.95 268.1 32.01 204.3 32.01zM144 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S166.1 400 144 400z"></path></svg>
            <span>FAQ</span> 
          </div>
        </div>:<></>
      }
    </div>
  );
};

export default Header;
