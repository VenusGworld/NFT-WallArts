import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useSetting } from "../hooks/useSetting";
import { toast } from "react-toastify";

const CURRENCY = "USD";

const fromEuroToCent = (amount) => amount * 100;

const successPayment = (data) => {
  console.log("Payment Successful");
  alert("Payment Successful");
};

const errorPayment = (data) => {
  console.log("Payment Error", data?.response?.data?.error?.raw?.message);
  error(
    data?.response?.data?.error?.raw?.message
      ? data?.response?.data?.error?.raw?.message
      : "Payment Error"
  );
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
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount, stripeRef }) => {
  const setting = useSetting();
  return (
    <StripeCheckout
      name={"Payment"}
      description={"Description"}
      amount={fromEuroToCent(amount)}
      token={onToken(amount, description)}
      currency={CURRENCY}
      image={process.env.REACT_APP_BACKEND_URL + "/client/img/logo.svg"}
      stripeKey={
        setting?.data?.data?.is_payment_test
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
