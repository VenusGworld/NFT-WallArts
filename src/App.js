import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import "./App.css";
import "./custom.css";
import Header from "./components/header";
import Lobby from "./pages/lobby";
import "react-toastify/dist/ReactToastify.css";
import { connect, isConnected, setChain, connectedAccount } from "./store/accountReducer";
import Profile from "./pages/Profile";
import "@fontsource/inter";
import Category from "./pages/Category";
import Footer from "./components/footer";
import CustomizedArt from "./pages/CustomizedArt";
import Preview from "./pages/Preview";
import Payment from "./pages/Payment";
import OrderSummary from "./pages/OrderSummary";
import ScrollToTop from "./helper/ScrollToTop";
import { getETHPrice } from "./utils/getEthPrice";
import { setEthPrice } from "./store/infoReducer";
import Home from "./pages/Home";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 20 seconds
      staleTime: 1000 * 20,
      retry: false,
      cacheTime: 5000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
    },
  },
});

export const main_routes = [
  // {
  //   key: "topsold",
  //   title: "Top Sold",
  //   description: "Top Sold",
  //   component: <Lobby />,
  //   path: "/topsold",
  //   isEnabled: true,
  //   appendDivider: true,
  // },
  {
    key: "home",
    title: "Home",
    description: "Home",
    component: <Home />,
    path: "/home",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "products",
    title: "Products",
    description: "products",
    component: <Home />,
    path: "/products",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "process",
    title: "Process",
    description: "process",
    component: <Home />,
    path: "/process",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "place_order",
    title: "Place Order",
    description: "place order",
    component: <Home />,
    path: "/place_order",
    isEnabled: true,
    appendDivider: true,
  }
];

function App() {
  const is_Connected = useSelector(isConnected);
  const connected_account = useSelector(connectedAccount);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(!is_Connected) {
  //     connectWallet();
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const connectWallet = async () => {
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
      const price_eth = await getETHPrice(window.ethereum)
      dispatch(setEthPrice(price_eth))
    } 

    // else {
    //   dispatch(disConnect())
    // }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="App">
        <Header />
        <ScrollToTop />
        {/* <div className=" p-3 bg-gray-600 rounded-md text-white absolute top-4 inline-block w-fit right-0 z-50">
          Wallet Address: {connected_account?connected_account:'Not Connected!'}
        </div> */}
        
        <Routes>
          {/* <Layout> */}
          <Route
            path="/"
            // element={<Navigate to="/category" replace />}
            element={<Navigate to="/profile" replace />}
          />
          {main_routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route key="profile" path="profile" element={<Profile />} />
          <Route key="category" path="category" element={is_Connected?<Category />:<div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">Connect Wallet First!</div>} />
          <Route
            key="customizedArt"
            path="customizedArt"
            element={<CustomizedArt />}
          />
          <Route key="preview" path="preview" element={is_Connected?<Preview />:<div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">Connect Wallet First!</div>} />
          <Route key="payment" path="payment" element={is_Connected?<Payment />:<div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">Connect Wallet First!</div>} />
          <Route
            key="order_summary"
            path="order_summary"
            element={is_Connected?<OrderSummary />:<div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">Connect Wallet First!</div>}
          />
          {/* </Layout> */}
        </Routes>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
