import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  connect,
  connectedAccount,
  isConnected,
  setChain,
  connectedChain,
} from "../store/accountReducer";
import { useETHPrice } from "../hooks/useEthPrice";
import { useNavigate } from "react-router-dom";
import { NETWORKS } from "../constant/constants";
import axios from "axios";

const ConnectButton = () => {
  const is_Connected = useSelector(isConnected);
  const connected_chain = useSelector(connectedChain);
  const connected_account = useSelector(connectedAccount);
  const dispatch = useDispatch();
  const price_eth = useETHPrice(window.ethereum);
  const navigate = useNavigate();
  // if(!price_eth.isLoading) console.log(price_eth.data,window.ethereum)

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        .then(() => {
          if (accounts[0]) dispatch(connect(accounts[0]));
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
    <div className="flex flex-row-reverse">
      {Object.keys(NETWORKS).map((oneKey, i) => {
        if (NETWORKS[oneKey]?.chainId === connected_chain && is_Connected)
          return (
            <div
              className={` flex items-center z-20 px-3 py-2 mx-1 rounded-md text-sm text-white text-center`}
              key={i}
              style={{ background: NETWORKS[oneKey].color }}
            >
              {NETWORKS[oneKey].name}
            </div>
          );
        return null;
      })}
      {Object.keys(NETWORKS).find(
        (x) => connected_chain === NETWORKS[x].chainId
      ) === undefined ? (
        <div
          className={` flex items-center z-20 px-3 py-2 mx-1 rounded-md text-sm text-white text-center`}
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
            });
            if (accounts[0]) dispatch(connect(accounts[0]));
            // const price_eth = useETHPrice(window.ethereum)
            // dispatch(setEthPrice(price_eth))
          } else {
            navigate(
              {
                pathname: "/client/profile",
                search: `?id=${"profile_section"}`,
              },
              {
                replace: true,
              }
            );
          }
        }}
        className="rounded-lg cursor-pointer text-sm hover:bg-[#f5cf92] transition-all bg-[#D3B789] py-2 px-6 border-2 border-[#513296]"
      >
        {!is_Connected
          ? "Connect Wallet"
          : connected_account.substring(0, 5) +
            "..." +
            connected_account.substring(
              connected_account.length - 4,
              connected_account.length
            )}
      </div>
    </div>
  );
};

export default ConnectButton;
