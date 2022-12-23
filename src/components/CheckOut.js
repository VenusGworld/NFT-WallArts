import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useSetting } from "../hooks/useSetting";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { initialize, orderedProducts } from "../store/cartReducer";
import { initialize as clearSelected } from "../store/selectedReducer";
import { useNavigate } from "react-router-dom";
import { useETHPrice } from "../hooks/useEthPrice";

const CURRENCY = "USD";

const Checkout = ({ name, description, amount, stripeRef, payMethod, orderedDataForCard }) => {
  const setting = useSetting();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fromEuroToCent = (amount) => Number(Number(amount * 100).toFixed(1));
  const eth_price = useETHPrice(window.ethereum);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const successPayment = async (data) => {
    success(`Sent Invoice for ${amount}$ to Your Email, Please Confirm!`);
    let temp_arr = [];

    orderedDataForCard.forEach((item, index) => {
      temp_arr.push({
        ...item,
        payment_type: payMethod,
        transaction_hash: process.env.REACT_APP_STRIPE_HASH_URL + data?.data?.success?.id,
        total_price_usd: Number(Number(item.total_price_eth) * eth_price.data).toFixed(1)//Number(data?.data?.success?.amount_captured) / 100,
      });
    });
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/order/`, temp_arr)
      .then(async (res) => {
        if (res.status === 201) {
          success(
            `Ordered Successfully! We'll check and send you product soon!`
          );
          await dispatch(initialize());
          await dispatch(clearSelected());

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
        // amount: amount,
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
      // amount={amount}
      email={orderedDataForCard[0]?.contact_email?(isValidEmail(orderedDataForCard[0]?.contact_email)?orderedDataForCard[0]?.contact_email:undefined):undefined}
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
