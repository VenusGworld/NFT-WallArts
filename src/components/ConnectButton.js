import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, connectedAccount, disConnect, isConnected, setChain } from '../store/accountReducer';
import { useETHPrice } from '../hooks/useEthPrice';
import { useNavigate } from 'react-router-dom';

const ConnectButton = () => {
  const is_Connected = useSelector(isConnected);
  const connected_account = useSelector(connectedAccount);
  const dispatch = useDispatch();
  const price_eth = useETHPrice(window.ethereum);
  const navigate = useNavigate();
  if(!price_eth.isLoading) console.log(price_eth.data,window.ethereum)

  return (<div onClick={async () => {
    if (!is_Connected) {
      await window.ethereum.send("eth_requestAccounts");
      dispatch(setChain(Number(window.ethereum?.networkVersion)));
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts[0]) dispatch(connect(accounts[0]));
      // const price_eth = useETHPrice(window.ethereum)
      // dispatch(setEthPrice(price_eth))
    } 

    else {
      navigate({
        pathname: "/profile",
      });
    }
  }} className='rounded-lg cursor-pointer text-sm hover:bg-[#f5cf92] transition-all bg-[#D3B789] py-2 px-6 border-2 border-[#513296]'> 
    {!is_Connected?'Connect Wallet':connected_account.substring(0, 5) + '...'+connected_account.substring(connected_account.length-4, connected_account.length)}
  </div>)
}

export default ConnectButton;