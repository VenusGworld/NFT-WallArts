import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  connect,
  connectedAccount,
  isConnected,
  setChain,
  connectedChain,
} from "../store/accountReducer";
import { useNavigate } from "react-router-dom";
import { NETWORKS } from "../constant/constants";
import axios from "axios";
import { useOrder } from "../hooks/useOrder";
import { useOrderStatus } from "../hooks/useOrderStatus";

const ConnectButton = () => {
  const is_Connected = useSelector(isConnected);
  const connected_chain = useSelector(connectedChain);
  const connected_account = useSelector(connectedAccount);
  const orders = useOrder();
  const orderStatus = useOrderStatus();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // if(!price_eth.isLoading) console.log(price_eth.data,window.ethereum)
  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(is_Connected) {
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/`, {
        wallet_address: connected_account,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected_account, is_Connected]);

  window.ethereum.on("accountsChanged", function () {
    connectWallet();
  });

  window.ethereum.on("networkChanged", function (networkId) {
    // console.log('networkChanged', networkId)
    connectWallet();
  });

  window.ethereum.on("chainChanged", (_chainId) => {
    dispatch(setChain(Number(_chainId)));
  });

  const connectWallet = async () => {
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });
    // console.log(process.env.REACT_APP_SHOULD_CONNECTED_CHAIN, NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].chainId !== connected_chain, '0x'+NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].chainId.toString(16))
    if (!is_Connected || account[0] !== connected_account) {
      await window.ethereum.send("eth_requestAccounts");
      dispatch(setChain(Number(window.ethereum?.networkVersion)));
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {}}]
        
      });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/`, {
          wallet_address: accounts[0],
        })
        .then((res) => {
          if (accounts[0]) dispatch(connect(accounts[0]));
          if (res.status === 200) {
            setUser(res?.data?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else if(NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].chainId !== connected_chain) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x'+NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].chainId.toString(16), }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x'+NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].chainId.toString(16),
                  chainName: NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].name,
                  rpcUrls: [NETWORKS[process.env.REACT_APP_SHOULD_CONNECTED_CHAIN].rpcUrl],
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
    }}
  };
  // console.log(Object.keys(NETWORKS).find(x => {console.log(NETWORKS[x]); return NETWORKS[x]?.chainId === connected_chain}), 'sdfsdfsdfsfddddddd', connected_chain)

  return (
    <div className="flex flex-row-reverse items-center">
      {Object.keys(NETWORKS).map((oneKey, i) => {
        if (NETWORKS[oneKey]?.chainId === connected_chain && is_Connected)
          return (
            <div
              className={` flex items-center z-20 px-1 py-1 mx-1 rounded-md text-xs text-white text-center`}
              key={i}
              style={{ background: NETWORKS[oneKey].color }}
            >
              {NETWORKS[oneKey].name} Network
            </div>
          );
        return null;
      })}
      {Object.keys(NETWORKS).find(
        (x) => connected_chain === NETWORKS[x].chainId
      ) === undefined ? (
        <div
          className={` flex items-center z-20 px-1 py-1 mx-1 rounded-md text-xs text-white text-center`}
          style={{ background: "black" }}
        >
          Unknown Chain
        </div>
      ) : null}
      <div
        onClick={async () => {
          const account = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (!is_Connected || account[0] !== connected_account) {
            await window.ethereum.send("eth_requestAccounts");
            dispatch(setChain(Number(window.ethereum?.networkVersion)));
            await window.ethereum.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            });
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });
            console.log("posting wallet address");
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/`, {
              wallet_address: accounts[0],
            }).then((res) => {
              console.log("res", res);
              if (res.status === 200) {
                setUser(res?.data?.data);
              }
            })
            .catch((err) => {});;
            if (accounts[0]) dispatch(connect(accounts[0]));
            // const price_eth = useETHPrice(window.ethereum)
            // dispatch(setEthPrice(price_eth))
          } else {
            navigate(
              {
                pathname: "/profile",
                search: `?id=${"profile_section"}`,
              },
              {
                replace: true,
              }
            );
          }
        }}
        className="cursor-pointer text-sm hover:bg-[#f5cf92] transition-all p-1 rounded-full border bg-green-900 border-gray-200"
      >
        {!is_Connected
          ? "Connect Wallet":( user?.avatar ? (
            <img
              loading="lazy"
              src={
                process.env.REACT_APP_BACKEND_URL +
                `/images/avatars/${user?.avatar}`
              }
              alt=""
              className=" w-6 h-6 rounded-full"
            />
          ) : (
            <img
              loading="lazy"
              src={
                process.env.PUBLIC_URL + "/img/sandbox_mark.svg"
              }
              alt=""
              className=" w-6 h-6 rounded-full"
            />
          ))
          // : connected_account.substring(0, 5) +
          //   "..." +
          //   connected_account.substring(
          //     connected_account.length - 4,
          //     connected_account.length
            }
      </div>

      <span className=" inline-block w-7 ml-5 text-gray-300 relative mx-5 hover:text-gray-400 cursor-pointer"
        onClick={() => {
          navigate({
            pathname: "/order_summary",
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <span style={{borderWidth: '5px', fontSize: '9px'}} className=" absolute text-center -top-2 px-1 w-fit h-6 bg-red-700 border border-[#221b33] rounded-full">{
          (orders?.data?.data)? orders?.data?.data.filter((order, i) => {
            return(order?.order_statuses[order?.order_statuses.length-1]?.order_status_id !== orderStatus?.data?.data[orderStatus?.data?.data.length-1]._id)
          }).length : 0
        }</span>
      </span>
    </div>
  );
};

export default ConnectButton;
