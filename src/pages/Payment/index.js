import React, { useEffect, useRef, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { confirmAlert } from "react-confirm-alert";

import {
  RadioGroup,
  RoundedDropDownSelect,
  RoundedPhoneNumberInput,
  RoundedTextInput,
} from "../../components/Input";
import PaymentMethodCard from "./PaymentMethodCard";
import PreviewPart from "./PreviewPart";
import { connectedAccount } from "../../store/accountReducer";
// import { useOrderStatus } from "../../hooks/useOrderStatus";
import axios from "axios";
import { selectedData } from "../../store/selectedReducer";
import {
  addingCart,
  initialize,
  orderedProducts,
} from "../../store/cartReducer";
import { useETHPrice } from "../../hooks/useEthPrice";
import { ethers } from "ethers";

const Payment = () => {
  const connected_account = useSelector(connectedAccount);
  const navigate = useNavigate();
  let countries = Country.getAllCountries();
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
  });
  const selected_data = useSelector(selectedData);
  const eth_price = useETHPrice(window.ethereum);
  const ordered_products = useSelector(orderedProducts);
  const dispatch = useDispatch();
  let initialCountry = countries[10];
  let initialState = State.getStatesOfCountry(initialCountry.isoCode)[0];
  let initialCity = City.getCitiesOfState(
    initialCountry.isoCode,
    State.getStatesOfCountry(initialCountry.isoCode)[0].isoCode
  )[0];
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    apt_suiteNo: "",
    postalCode: "",
    country: initialCountry,
    state: initialState,
    city: initialCity,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apt_suiteNo: "",
    postalCode: "",
    paymentMethod: "crypto",
    country: initialCountry,
    state: initialState,
    city: initialCity,
  });
  const [statesDeliveryArray, setStatesDeliveryArray] = useState(
    State.getStatesOfCountry(initialCountry.isoCode)
  );
  const [citiesDeliveryArray, setCitiesDeliveryArray] = useState(
    City.getCitiesOfState(
      initialCountry.isoCode,
      State.getStatesOfCountry(initialCountry.isoCode)[0].isoCode
    )
  );
  const [statesPaymentArray, setStatesPaymentArray] = useState(
    State.getStatesOfCountry(initialCountry.isoCode)
  );
  const [citiesPaymentArray, setCitiesPaymentArray] = useState(
    City.getCitiesOfState(
      initialCountry.isoCode,
      State.getStatesOfCountry(initialCountry.isoCode)[0].isoCode
    )
  );
  const [isCrypto, setIsCrypto] = useState(true);
  const [isSameAddress, setIsSameAddress] = useState(true);
  useEffect(() => {
    setStatesDeliveryArray(
      State.getStatesOfCountry(deliveryInfo.country.isoCode)
    );
    statesDeliveryArray[0]
      ? setDeliveryInfo({ ...deliveryInfo, state: statesDeliveryArray[0] })
      : setDeliveryInfo({ ...deliveryInfo, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryInfo.country]);

  useEffect(() => {
    setCitiesDeliveryArray(
      City.getCitiesOfState(
        deliveryInfo.country.isoCode,
        deliveryInfo.state.isoCode
      )
    );
    citiesDeliveryArray[0]
      ? setDeliveryInfo({ ...deliveryInfo, city: citiesDeliveryArray[0] })
      : setDeliveryInfo({ ...deliveryInfo, city: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryInfo.state]);

  useEffect(() => {
    setStatesPaymentArray(
      State.getStatesOfCountry(paymentInfo.country.isoCode)
    );
    statesPaymentArray[0]
      ? setPaymentInfo({ ...paymentInfo, state: statesPaymentArray[0] })
      : setPaymentInfo({ ...paymentInfo, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentInfo.country]);

  useEffect(() => {
    setCitiesPaymentArray(
      City.getCitiesOfState(
        paymentInfo.country.isoCode,
        paymentInfo.state.isoCode
      )
    );
    citiesPaymentArray[0]
      ? setPaymentInfo({ ...paymentInfo, city: citiesPaymentArray[0] })
      : setPaymentInfo({ ...paymentInfo, city: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentInfo.state]);
  // const orderStatus = useOrderStatus();
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
  const checkInputFormValidation = (arr) => {
    let flag = true;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (element.v === "" || element.v === undefined || !element.v) {
        error(`Input ${element.err_msg}!`);
        flag = false;
      }
    }
    return flag;
  };
  const addToCart = async () => {
    let arr = [];

    if (!isCrypto && !isSameAddress) {
      arr = [
        { v: paymentInfo.firstName, err_msg: "Payment Information First Name" },
        { v: paymentInfo.lastName, err_msg: "Payment Information Last Name" },
        { v: paymentInfo.address, err_msg: "Payment Information Address" },
        {
          v: paymentInfo.apt_suiteNo,
          err_msg: "Payment Information Apt / Suite No.",
        },
        {
          v: paymentInfo.postalCode,
          err_msg: "Payment Information Postal Code",
        },
      ];
    }
    let { firstName, lastName, phoneNo, email } = contactInfo;
    let { address, apt_suiteNo, postalCode, country, state, city } =
      deliveryInfo;
    let shouldBeCheckedValues = [
      { v: firstName, err_msg: "Contact Information First Name" },
      { v: lastName, err_msg: "Contact Information Last Name" },
      { v: phoneNo, err_msg: "Contact Information Phone Number" },
      { v: email, err_msg: "Contact Information Email" },
      { v: address, err_msg: "Delivery Information Address" },
      { v: apt_suiteNo, err_msg: "Delivery Information Apt / Suite No." },
      { v: postalCode, err_msg: "Delivery Information Postal Code" },
      ...arr,
    ];
    if (checkInputFormValidation(shouldBeCheckedValues)) {
      const formData = {};
      formData.item_id = selected_data?.item_data?._id;
      formData.quantity = selected_data?.quantity;
      formData.user_wallet_address = connected_account;
      formData.contact_first_name = firstName;
      formData.contact_last_name = lastName;
      formData.contact_phone_number = phoneNo;
      formData.contact_email = email;
      formData.delivery_address = address;
      formData.delivery_apt_suite_No = apt_suiteNo;
      formData.delivery_country = country.isoCode;
      formData.delivery_state = state.isoCode;
      formData.delivery_city = city.name;
      formData.delivery_postal_code = postalCode;
      formData.payment_first_name =
        isSameAddress || isCrypto ? firstName : paymentInfo.firstName;
      formData.payment_last_name =
        isSameAddress || isCrypto ? lastName : paymentInfo.lastName;
      formData.payment_address =
        isSameAddress || isCrypto ? address : paymentInfo.address;
      formData.payment_apt_suite_No =
        isSameAddress || isCrypto ? apt_suiteNo : paymentInfo.apt_suiteNo;
      formData.payment_type = paymentInfo.paymentMethod;
      formData.payment_country =
        isSameAddress || isCrypto
          ? country.isoCode
          : paymentInfo.country.isoCode;
      formData.payment_state =
        isSameAddress || isCrypto ? state.isoCode : paymentInfo.state.isoCode;
      formData.payment_city =
        isSameAddress || isCrypto ? city.name : paymentInfo.city.name;
      formData.payment_postal_code =
        isSameAddress || isCrypto ? postalCode : paymentInfo.postalCode;
      formData.item_info = selected_data?.item_data;
      formData.image_for_printing = selected_data?.nft_img;
      formData.name_for_printing = selected_data?.nft_name;
      formData.nft_description = selected_data?.nft_description;
      formData.nft_contractAddress = selected_data?.nft_contractAddress;
      formData.nft_tokenId = selected_data?.nft_tokenId;
      formData.nft_symbol = selected_data?.nft_symbol;
      formData.nft_totalSupply = selected_data?.nft_totalSupply;

      let dis = 0;
      if (selected_data?.item_data?.isBulk) {
        let min = 100000;
        selected_data?.item_data?.bulk_pricing.forEach((p) => {
          if (
            Number(selected_data?.quantity) - p.quantity >= 0 &&
            min > Number(selected_data?.quantity) - p.quantity
          ) {
            min = Number(selected_data?.quantity) - p.quantity;
            dis = p.discount;
          }
        });
      }
      formData.total_price_eth =
        selected_data?.item_data?.priceType === "eth"
          ? Number(
              selected_data?.quantity *
                selected_data?.item_data?.price *
                ((100 - dis) / 100)
            )
          : Number(
              selected_data?.quantity *
                selected_data?.item_data?.price *
                ((100 - dis) / 100)
            ) / eth_price.data;
      // console.log('form_data', formData);
      await dispatch(addingCart(formData));
      return true;
    }
    return false;
  };
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const stripeButton = useRef(null);
  const submitOrder = async () => {
    // console.log('paymentInfo.paymentMethod', paymentInfo.paymentMethod);
    if (paymentInfo.paymentMethod === "crypto") {
      const balance = await provider.getBalance(connected_account);
      const balanceInEther = ethers.utils.formatEther(balance);
      let temp = 0;
      ordered_products?.orderedProducts.forEach((item) => {
        temp = Number(Number(temp) + Number(item.total_price_eth));
      });
      if (Number(balanceInEther) < temp) {
        error("You haven't got enough ETH for Payment in your Wallet");
      } else {
        try {
          console.log("process.env.REACT_APP_ADMIN_ADDRESS", temp);
          const tx = await signer.sendTransaction({
            to: process.env.REACT_APP_ADMIN_ADDRESS,
            value: ethers.utils.parseEther(temp.toString()),
          });
          await tx.wait();
          success(
            `Sent ${temp}ETH to ${process.env.REACT_APP_ADMIN_ADDRESS} successfully!`
          );
          let temp_arr = [];
          ordered_products?.orderedProducts.forEach((item, index) => {
            console.log(index, item)
            temp_arr.push({
              ...item,
              payment_type: paymentInfo.paymentMethod,
              transaction_hash:
                process.env.REACT_APP_ETHERSCAN_HASH_URL + tx.hash,
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
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (paymentInfo.paymentMethod === "visa" || paymentInfo.paymentMethod === "mastercard") {
      stripeButton.current.click();
    }
  };

  return (
    <div className="w-full h-full mt-20 relative text-white">
      <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start">
        <div className="xl:w-[80%] w-[90%] mx-auto flex md:flex-row flex-col">
          <div className="flex justify-start items-start xl:w-3/5 w-full sm:pr-8 pr-0">
            <div className="flex flex-col">
              <span className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-7 text-start">
                Mailing Details
              </span>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">
                  1.Contact Information
                </span>
                <div className="flex sm:flex-row flex-col flex-wrap justify-between">
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="First Name"
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, firstName: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Last Name"
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, lastName: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedPhoneNumberInput
                      label="Phone No."
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, phoneNo: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Email"
                      type='email'
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, email: v });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">
                  2. Delivery Address
                </span>
                <div className="flex sm:flex-row flex-col flex-wrap justify-between">
                  <div className=" sm:w-[45%] w-[90%] mb-5">
                    <RoundedTextInput
                      label="Address"
                      onChangeHandle={(v) => {
                        setDeliveryInfo({ ...deliveryInfo, address: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      onChangeHandle={(v) => {
                        setDeliveryInfo({ ...deliveryInfo, apt_suiteNo: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="Country"
                      value={
                        countries.findIndex(
                          (x) => x.name === deliveryInfo.country.name
                        ) > 0
                          ? countries.findIndex(
                              (x) => x.name === deliveryInfo.country.name
                            )
                          : 0
                      }
                      list={countries.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        setDeliveryInfo({
                          ...deliveryInfo,
                          country:
                            countries[
                              countries.findIndex((x) => x.isoCode === v) > 0
                                ? countries.findIndex((x) => x.isoCode === v)
                                : 0
                            ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="State"
                      value={
                        statesDeliveryArray.findIndex(
                          (x) => x.name === deliveryInfo.state.name
                        ) > 0
                          ? statesDeliveryArray.findIndex(
                              (x) => x.name === deliveryInfo.state.name
                            )
                          : 0
                      }
                      list={statesDeliveryArray.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        setDeliveryInfo({
                          ...deliveryInfo,
                          state:
                            statesDeliveryArray[
                              statesDeliveryArray.findIndex(
                                (x) => x.isoCode === v
                              ) > 0
                                ? statesDeliveryArray.findIndex(
                                    (x) => x.isoCode === v
                                  )
                                : 0
                            ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="City"
                      value={
                        citiesDeliveryArray.findIndex(
                          (x) => x.name === deliveryInfo.city.name
                        ) > 0
                          ? citiesDeliveryArray.findIndex(
                              (x) => x.name === deliveryInfo.city.name
                            )
                          : 0
                      }
                      list={citiesDeliveryArray.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        setDeliveryInfo({
                          ...deliveryInfo,
                          city: citiesDeliveryArray[
                            citiesDeliveryArray.findIndex(
                              (x) => x.isoCode === v
                            ) > 0
                              ? citiesDeliveryArray.findIndex(
                                  (x) => x.isoCode === v
                                )
                              : 0
                          ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Postal Code"
                      onChangeHandle={(v) => {
                        setDeliveryInfo({ ...deliveryInfo, postalCode: v });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">3. Payment Method</span>
                <div className=" relative w-full">
                  <PaymentMethodCard
                    onChangeHandle={(v) => {
                      setPaymentInfo({ ...paymentInfo, paymentMethod: v });
                      if (v === "crypto") {
                        setIsCrypto(true);
                      } else setIsCrypto(false);
                    }}
                  />
                </div>
                {!isCrypto && (
                  <div className="flex flex-wrap my-10">
                    <RadioGroup
                      list={[
                        "Same as shipping address",
                        "Use a different billing address",
                      ]}
                      checkedId={isSameAddress ? 0 : 1}
                      onChangeHandle={(v) => {
                        if (v === "Same as shipping address")
                          setIsSameAddress(true);
                        else setIsSameAddress(false);
                      }}
                    />
                  </div>
                )}
                <div
                  className={`sm:flex-row flex-col flex-wrap justify-between ${
                    !isSameAddress && !isCrypto ? " flex" : " hidden"
                  }`}
                >
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="First Name"
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, firstName: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Last Name"
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, lastName: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Address"
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, address: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, apt_suiteNo: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="Country"
                      value={
                        countries.findIndex(
                          (x) => x.name === paymentInfo.country.name
                        ) > 0
                          ? countries.findIndex(
                              (x) => x.name === paymentInfo.country.name
                            )
                          : 0
                      }
                      list={countries.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          country:
                            countries[
                              countries.findIndex((x) => x.isoCode === v) > 0
                                ? countries.findIndex((x) => x.isoCode === v)
                                : 0
                            ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="State"
                      value={
                        statesPaymentArray.findIndex(
                          (x) => x.name === paymentInfo.state.name
                        ) > 0
                          ? statesPaymentArray.findIndex(
                              (x) => x.name === paymentInfo.state.name
                            )
                          : 0
                      }
                      list={statesPaymentArray.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          state:
                            statesPaymentArray[
                              statesPaymentArray.findIndex(
                                (x) => x.isoCode === v
                              ) > 0
                                ? statesPaymentArray.findIndex(
                                    (x) => x.isoCode === v
                                  )
                                : 0
                            ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="City"
                      value={
                        citiesPaymentArray.findIndex(
                          (x) => x.name === paymentInfo.city.name
                        ) > 0
                          ? citiesPaymentArray.findIndex(
                              (x) => x.name === paymentInfo.city.name
                            )
                          : 0
                      }
                      list={citiesPaymentArray.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          city: citiesPaymentArray[
                            citiesPaymentArray.findIndex(
                              (x) => x.isoCode === v
                            ) > 0
                              ? citiesPaymentArray.findIndex(
                                  (x) => x.isoCode === v
                                )
                              : 0
                          ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Postal Code"
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, postalCode: v });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[40%] w-full mx-auto">
            <PreviewPart
              stripeRef={stripeButton}
              payMethod={paymentInfo.paymentMethod}
              amount={() => {
                let temp = 0;
                ordered_products?.orderedProducts.forEach((item) => {
                  temp = Number(Number(temp) + Number(item.total_price_eth));
                });
                temp = Number(temp * eth_price.data).toFixed(1);
                // console.log('temp', temp)
                return temp;
              }}
              orderClickHandle={async (isOrder) => {
                if (isOrder) {
                  if (
                    window.confirm("Are you sure to Order this product too?")
                  ) {
                    let res = await addToCart();
                    console.log("res", res);
                    if (res) {
                      success("Added Product to Cart");
                      submitOrder();
                    }
                  } else {
                    submitOrder();
                  }
                } else {
                  let res = await addToCart();
                  console.log("res", res);
                  if (res) {
                    success("Added Product to Cart");
                    navigate({
                      pathname: "/profile",
                    });
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
