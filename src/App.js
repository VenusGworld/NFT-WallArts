import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "./custom.css";
import Header from "./components/header";

// import "react-toastify/dist/ReactToastify.css";
import {
  clearResults,
  isConnected,
  // connectedAccount,
} from "./store/accountReducer";
import Profile from "./pages/Profile";
import "@fontsource/inter";
import Category from "./pages/Category";
import Footer from "./components/footer";
import CustomizedArt from "./pages/CustomizedArt";
import Preview from "./pages/Preview";
import Payment from "./pages/Payment";
import OrderSummary from "./pages/OrderSummary";
import ScrollToTop from "./helper/ScrollToTop";
import Home from "./pages/Home";
// import { clearResults as initializeSelected } from "./store/selectedReducer";
// import { clearResults as initializeCart } from "./store/cartReducer";

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
    // component: <OrderSummary />,
    path: "/profile",
    isEnabled: true,
    appendDivider: true,
  },
];

function App() {
  const is_Connected = useSelector(isConnected);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearResults());
    // connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initializeStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeStore = async () => {
    // await dispatch(initializeAccount());
    // await dispatch(initializeInfo());
    // await dispatch(initializeCart());
    // await dispatch(initializeSelected());
  };
  const [avatarReload, setAvatar] = useState(0)
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="App">
        <Header avatarReload = {avatarReload} />
        <ScrollToTop />
        {/* <div className=" p-3 bg-gray-600 rounded-md text-white absolute top-4 inline-block w-fit right-0 z-50">
          Wallet Address: {connected_account?connected_account:'Not Connected!'}
        </div> */}

        <Routes>
          {/* <Layout> */}
          <Route
            path="/"
            // element={<Navigate to="/category" replace />}
            element={<Navigate to="/home" replace />}
          />
          {main_routes.map((route) => {
            if (route.key === 'place_order') return (<Route
              key={'/profile_'}
              path="/profile_"
              // element={<Navigate to="/category" replace />}
              element={<Navigate to="/profile" replace />}
            />)
            return (
              <Route
                key={route.key}
                path={route.path}
                element={route.component}
              />
            )
          })}
          <Route key="profile" path="/profile" element={
              is_Connected ? (
                <Profile onAvatarChanged={() =>{
                  setAvatar(avatarReload+1)
                }} />
              ) : (
                <div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700 ">
                  <span className="p-5 rounded-lg border-2 border-[#6d42b7] ">Connect Wallet First!</span>
                </div>
              )
            } />
          <Route
            key="category"
            path="/category"
            element={
              is_Connected ? (
                <Category />
              ) : (
                <div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">
                  <span className="p-5 rounded-lg border-2 border-[#6d42b7]">Connect Wallet First!</span>
                </div>
              )
            }
          />
          <Route
            key="customizedArt"
            path="/customizedArt"
            element={<CustomizedArt />}
          />
          <Route
            key="preview"
            path="/preview"
            element={
              is_Connected ? (
                <Preview />
              ) : (
                <div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">
                  <span className="p-5 rounded-lg border-2 border-[#6d42b7]">Connect Wallet First!</span>
                </div>
              )
            }
          />
          <Route
            key="payment"
            path="/payment"
            element={
              is_Connected ? (
                <Payment />
              ) : (
                <div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">
                  <span className="p-5 rounded-lg border-2 border-[#6d42b7]">Connect Wallet First!</span>
                </div>
              )
            }
          />
          <Route
            key="order_summary"
            path="/order_summary"
            element={
              is_Connected ? (
                <OrderSummary />
              ) : (
                <div className=" flex justify-center items-center text-white text-2xl py-40 bg-slate-700">
                  <span className="p-5 rounded-lg border-2 border-[#6d42b7]">Connect Wallet First!</span>
                </div>
              )
            }
          />
          {/* </Layout> */}
        </Routes>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
