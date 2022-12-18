import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useSetting } from "../hooks/useSetting";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { initialize, orderedProducts } from "../store/cartReducer";
import { useNavigate } from "react-router-dom";

const CURRENCY = "USD";

const Checkout = ({ name, description, amount, stripeRef, payMethod }) => {
  const setting = useSetting();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log((setting?.data?.data?.is_payment_test || setting?.data?.data?.is_payment_test ===undefined)?process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE:process.env.REACT_APP_STRIPE_LIVE_PUBLISHABLE);
  const fromEuroToCent = (amount) => amount * 100;
  const ordered_products = useSelector(orderedProducts);
  const successPayment = async (data) => {
    console.log("data", data);
    success(`Sent Invoice for ${amount}$ to Your Email, Please Confirm!`);
    let temp_arr = [];
    ordered_products?.orderedProducts.forEach((item, index) => {
      console.log(index, item);
      temp_arr.push({
        ...item,
        payment_type: payMethod,
        transaction_hash: process.env.REACT_APP_STRIPE_HASH_URL + data?.data?.success?.id,
        total_price_usd: Number(data?.data?.success?.amount_captured) / 100,
      });
    });
    console.log("products", temp_arr);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/order/`, temp_arr)
      .then(async (res) => {
        if (res.status === 201) {
          success(
            `Ordered Successfully! We'll check and send you product soon!`
          );
          console.log(res);
          await dispatch(initialize());
          await navigate({
            pathname: "/profile",
          });
        }
      })
      .catch((err) => {
        error(err.response.data.message);
        console.log(err);
      });
  };

  const errorPayment = (data) => {
    error(
      data?.response?.data?.error?.raw?.message
        ? data?.response?.data?.error?.raw?.message
        : "Payment Error"
    );
  };
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

  const onToken = (amount, description) => (token) =>
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/payment/`, {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromEuroToCent(amount),
      })
      .then((data) => {
        return successPayment(data);
      })
      .catch((data) => {
        return errorPayment(data);
      });
  if (setting.isLoading) <></>;
  return (
    <StripeCheckout
      name={"Payment"}
      description={"Description"}
      amount={fromEuroToCent(amount)}
      token={onToken(amount, description)}
      currency={CURRENCY}
      image={process.env.PUBLIC_URL + "/img/logo.svg"}
      stripeKey={
        setting?.data?.data?.is_payment_test ||
        setting?.data?.data?.is_payment_test === undefined
          ? process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE
          : process.env.REACT_APP_STRIPE_LIVE_PUBLISHABLE
      }
    >
      <button className="hidden" ref={stripeRef}>
        Use your own child component, which gets wrapped in whatever component
        you pass into as "ComponentClass" (defaults to span)
      </button>
    </StripeCheckout>
  );
};

export default Checkout;
