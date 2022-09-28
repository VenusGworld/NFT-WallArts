
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './custom.css';
import Header from './components/header';
import Explorer from './pages/explorer';
import Lobby from './pages/lobby';
import 'react-toastify/dist/ReactToastify.css';
import { connect, isConnected, setChain } from "./store/accountReducer";
import Profile from './pages/Profile';
import "@fontsource/inter";
import Category from './pages/Category';
import Footer from './components/footer';
import CustomizedArt from './pages/CustomizedArt';
import Preview from './pages/Preview';
import Payment from './pages/Payment';
import OrderSummary from './pages/OrderSummary';

export const main_routes = [
  {
    key: "explore",
    title: "Explore",
    description: "Explore",
    component: <Explorer/>,
    path: "/explorer",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "topsold",
    title: "Top Sold",
    description: "Top Sold",
    component: <Lobby/>,
    path: "/topsold",
    isEnabled: true,
    appendDivider: true,
  },
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
        <Routes>
          {/* <Layout> */}
          <Route
              path="/"
              element={<Navigate to="/category" replace />}
          />
          {main_routes.map(route =>
            <Route key={route.key} path={route.path} element={route.component} />
          )}
          <Route key='profile' path='profile' element={<Profile/>}/>
          <Route key='category' path='category' element={<Category/>}/>
          <Route key='customizedArt' path='customizedArt' element={<CustomizedArt/>}/>
          <Route key='preview' path='preview' element={<Preview/>}/>
          <Route key='payment' path='payment' element={<Payment/>}/>
          <Route key='order_summary' path='order_summary' element={<OrderSummary/>}/>
          {/* </Layout> */}
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
