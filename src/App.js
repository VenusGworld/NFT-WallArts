
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './custom.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Staking from './pages/staking';
import Lobby from './pages/lobby';
import BuyandSell from './pages/buy&sell';
import 'react-toastify/dist/ReactToastify.css';
import { connect, isConnected, setChain } from "./store/accountReducer";

export const routes = [
  {
    key: "router-staking",
    title: "Staking",
    description: "Staking",
    component: <Staking/>,
    path: "/staking",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "router-lobby",
    title: "Lobby",
    description: "Lobby",
    component: <Lobby/>,
    path: "/lobby",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "buyandsell",
    title: "Buy & Sell",
    description: "Buy & Sell",
    component: <BuyandSell/>,
    path: "/buyandsell",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "faq",
    title: "FAQ",
    description: "FAQ",
    component: <></>,
    path: "/faq",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "tokentransfer",
    title: "Tokens Transfer",
    description: "Tokens Transfer",
    component: <></>,
    path: "/tokentransfer",
    isEnabled: true,
    appendDivider: true,
  }
];

function App() {
  const is_Connected = useSelector(isConnected);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(!is_Connected) connectWallet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const connectWallet = async () => {
    if(!is_Connected) {
      await window.ethereum.send("eth_requestAccounts");
      dispatch(setChain(Number(window.ethereum?.networkVersion)));
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {}}]
      });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts[0]) dispatch(connect(accounts[0]))
    }
    // else {
    //   dispatch(disConnect())
    // }
  }

  return (
    <div className="App">
        <Header/>
        <Sidebar/>
        <Routes>
          {/* <Layout> */}
          <Route
              path="/"
              element={<Navigate to="/staking" replace />}
          />
          {routes.map(route =>
            <Route key={route.key} path={route.path} element={route.component} />
          )}
          {/* </Layout> */}
        </Routes>
    </div>
  );
}

export default App;
