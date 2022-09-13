import React from "react";
import { ToastContainer, toast } from 'react-toastify';

import Input from "../../../Input";

const Staking = () => {
  const notify = () => toast("Undefined Entered Data", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
  });
  return (
    <div className=" md:w-[40%] w-full inline-block"
      style={{
        height: "275px",
        textAlign: 'start',
      }}
    >
      <p
        style={{
          fontSize: "18px",
          color: "#5e5e5eb8",
          marginTop: "-7px",
          fontFamily: "sans-serif",
          fontWeight: "800",
          padding: "10px 10px 6px 10px",
        }}
      >
        Stake
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#5e5e5eb8",
          marginTop: "-7px",
          fontFamily: "sans-serif",
          fontWeight: "300",
          padding: "0px 10px 10px 10px",
        }}
      >
        Stake your Tokens to earn Dividends and Bonus Tokens on them.
      </p>
      <div className="md:block flex items-center flex-col">
        <Input placeholder="Tokens to stake" type='white' img='avarice_logo_4.png'/>
        <Input placeholder="Stake days" type='white'/>
        <div className="do-stake-btn" onClick={notify}>
          <span
            className="do-stake-btn-txt"
            style={{
              color: "#ffffff66",
              fontSize: "22px",
              fontWeight: "800",
              fontFamily: "sans-serif",
              /* top: 6px;
               */ lineHeight: "35px",
            }}
          >
            Stake
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Staking;
