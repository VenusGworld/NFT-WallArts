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
import { initialize as clearSelected, selectedData } from "../../store/selectedReducer";
import {
  addingCart,
  initialize,
  orderedProducts,
  setCart,
} from "../../store/cartReducer";
import { useETHPrice } from "../../hooks/useEthPrice";
import { ethers } from "ethers";
import { filledPaymentDeliveryInfo, setPaymentDeliveryInfo } from "../../store/filledPaymentInfoReducer";
// import PreviewSelectedProduct from "./PreviewSelectedProduct";

const Payment = () => {
  const connected_account = useSelector(connectedAccount);
  const filled_payment_delivery_info = useSelector(filledPaymentDeliveryInfo);
  const navigate = useNavigate();
  let countries = Country.getAllCountries();
  const [contactInfo, setContactInfo] = useState((filled_payment_delivery_info?.contactInfo)?filled_payment_delivery_info.contactInfo:{
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
  const [deliveryInfo, setDeliveryInfo] = useState(filled_payment_delivery_info?.deliveryInfo?filled_payment_delivery_info?.deliveryInfo:{
    address: "",
    apt_suiteNo: "",
    postalCode: "",
    country: initialCountry,
    state: initialState,
    city: initialCity,
  });
  const [paymentInfo, setPaymentInfo] = useState((filled_payment_delivery_info?.paymentInfo)?filled_payment_delivery_info?.paymentInfo:{
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
  const [isCrypto, setIsCrypto] = useState(filled_payment_delivery_info?.isCrypto !== undefined ?filled_payment_delivery_info?.isCrypto:true);
  const [isSameAddress, setIsSameAddress] = useState(filled_payment_delivery_info?.isSameAddress !== undefined ?filled_payment_delivery_info?.isSameAddress:true);
  useEffect(() => {
    addToCart();
    // console.log("res", res);
    dispatch(clearSelected());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  /////////////////////////////////////////
  const [orderedDataForCard, setOrderedDataForCard] = useState([])
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const stripeButton = useRef(null);

 
  const addToCart = async () => {
    if (Object.keys(selected_data?.item_data).length === 0) {
      // error('Order a Product First For Adding Cart!');
      // return false;
    }
    else {
      let flag = false;
      let products_arr = [];
      ordered_products?.orderedProducts.forEach((item) => {
        if(
          item?.item_id === selected_data?.item_data?._id &&
          item?.image_for_printing === selected_data?.nft_img
          ) {
            products_arr.push({
              ...item, 
              quantity: Number(item?.quantity) + Number(selected_data?.quantity)
            })
            flag = true;
          }
          else products_arr.push({
            ...item
          })
      })
      if(flag) {
        dispatch(setCart(products_arr))
        return 
      }
      const formData = {};
      formData.item_id = selected_data?.item_data?._id;
      formData.quantity = selected_data?.quantity;
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
      await dispatch(addingCart(formData));
      // return true;
      // }
    }
    // return false;
  };

  const submitOrder = async () => {
    let arr = [];
    if(ordered_products?.orderedProducts.length === 0) {
      error("You haven't got any Product in cart. Order First!");
      return
    }
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
      let orderedProducts = ordered_products?.orderedProducts;
      let array = [];
      orderedProducts?.forEach((item) => {
        array.push({
          ...item,
          user_wallet_address: connected_account,
          contact_first_name: firstName,
          contact_last_name: lastName,
          contact_phone_number: phoneNo,
          contact_email: email,
          delivery_address: address,
          delivery_apt_suite_No: apt_suiteNo,
          delivery_country: country.isoCode,
          delivery_state: state.isoCode,
          delivery_city: city.name,
          delivery_postal_code: postalCode,
          payment_first_name:
            isSameAddress || isCrypto ? firstName : paymentInfo.firstName,
          payment_last_name:
            isSameAddress || isCrypto ? lastName : paymentInfo.lastName,
          payment_address:
            isSameAddress || isCrypto ? address : paymentInfo.address,
          payment_apt_suite_No:
            isSameAddress || isCrypto ? apt_suiteNo : paymentInfo.apt_suiteNo,
          payment_type: paymentInfo.paymentMethod,
          payment_country:
            isSameAddress || isCrypto
              ? country.isoCode
              : paymentInfo.country.isoCode,
          payment_state:
            isSameAddress || isCrypto ? state.isoCode : paymentInfo.state.isoCode,
          payment_city:
            isSameAddress || isCrypto ? city.name : paymentInfo.city.name,
          payment_postal_code:
            isSameAddress || isCrypto ? postalCode : paymentInfo.postalCode,
        })

      })
      // ordered_products?.orderedProducts.forEach((item))
      if (
        window.confirm("Are you sure to CheckOut?")
      ) {
        await setOrderedDataForCard(array);
        if (paymentInfo.paymentMethod === "crypto") {
          const balance = await provider.getBalance(connected_account);
          const balanceInEther = ethers.utils.formatEther(balance);
          let temp = 0;
          array.forEach((item) => {
            temp = Number(Number(temp) + Number(item.total_price_eth));
          });
          if (Number(balanceInEther) < temp) {
            error("You haven't got enough ETH for Payment in your Wallet");
          } else {
            try {
              const tx = await signer.sendTransaction({
                to: process.env.REACT_APP_ADMIN_ADDRESS,
                value: ethers.utils.parseEther(temp.toString()),
              });
              await tx.wait();
              success(
                `Sent ${temp}ETH to ${process.env.REACT_APP_ADMIN_ADDRESS} successfully!`
              );
              let temp_arr = [];
              array.forEach((item, index) => {
                // console.log(index, item);
                temp_arr.push({
                  ...item,
                  payment_type: paymentInfo.paymentMethod,
                  transaction_hash:
                    process.env.REACT_APP_ETHERSCAN_HASH_URL + tx.hash,
                });
              });
              // console.log("products", temp_arr);
              await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/order/`, temp_arr)
                .then(async (res) => {
                  if (res.status === 201) {
                    success(
                      `Ordered Successfully! We'll check and send you product soon!`
                    );
                    // console.log(res);
                    await dispatch(initialize());
                    // await dispatch(clearSelected());
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
        if (
          paymentInfo.paymentMethod === "visa" ||
          paymentInfo.paymentMethod === "mastercard"
        ) {
          stripeButton.current.click();
        }
      } else {

      }

    }
  };

  return (
    <div className="w-full h-full mt-20 relative text-white">
      <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start">
        <div className="xl:w-[80%] w-full mx-auto flex md:flex-row flex-col md:space-y-0 space-y-5 max-w-[1400px]">
          <div className="flex md:justify-start justify-center items-start xl:w-3/5 w-full sm:pr-8 pr-0">
            <div className="flex flex-col">
              <span className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block sm:my-7 my-3 text-start">
                Mailing Details
              </span>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] md:my-8 my-4">
                  1.Contact Information
                </span>
                <div className="flex sm:flex-row flex-col flex-wrap justify-between w-full">
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="First Name"
                      defaultValue={contactInfo.firstName}
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, firstName: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Last Name"
                      defaultValue={contactInfo.lastName}
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, lastName: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedPhoneNumberInput
                      label="Phone No."
                      defaultValue={contactInfo.phoneNo !== undefined?contactInfo.phoneNo.toString():""}
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, phoneNo: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                    defaultValue={contactInfo.email}
                      label="Email"
                      type="email"
                      onChangeHandle={(v) => {
                        setContactInfo({ ...contactInfo, email: v });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] md:my-8 my-4">
                  2. Delivery Address
                </span>
                <div className="flex sm:flex-row flex-col flex-wrap justify-between w-full">
                  <div className=" sm:w-[45%] w-full md:mb-5 mb-2">
                    <RoundedTextInput
                    defaultValue={deliveryInfo.address}
                      label="Address"
                      onChangeHandle={(v) => {
                        setDeliveryInfo({ ...deliveryInfo, address: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      defaultValue={deliveryInfo.apt_suiteNo}
                      onChangeHandle={(v) => {
                        setDeliveryInfo({ ...deliveryInfo, apt_suiteNo: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
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
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
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
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
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
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Postal Code"
                      defaultValue={deliveryInfo.postalCode}
                      onChangeHandle={(v) => {
                        setDeliveryInfo({ ...deliveryInfo, postalCode: v });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] md:my-8 my-4">3. Payment Method</span>
                <div className=" relative w-full">
                  <PaymentMethodCard
                  defaultValue={paymentInfo.paymentMethod}
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
                  className={`sm:flex-row flex-col flex-wrap justify-between ${!isSameAddress && !isCrypto ? " flex" : " hidden"
                    }`}
                >
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="First Name"
                      defaultValue={paymentInfo.firstName}
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, firstName: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Last Name"
                      defaultValue={paymentInfo.lastName}
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, lastName: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Address"
                      defaultValue={paymentInfo.address}
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, address: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      defaultValue={paymentInfo.apt_suiteNo}
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, apt_suiteNo: v });
                      }}
                    />
                  </div>
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
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
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
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
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
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
                  <div className=" w-full sm:w-[45%] md:mb-5 mb-2">
                    <RoundedTextInput
                      label="Postal Code"
                      defaultValue={paymentInfo.postalCode}
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...paymentInfo, postalCode: v });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[40%] w-full mx-auto space-y-5">
            {/* <PreviewSelectedProduct data={selected_data} /> */}
            <PreviewPart
              stripeRef={stripeButton}
              payMethod={paymentInfo.paymentMethod}
              orderedDataForCard={orderedDataForCard}
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
                await dispatch(setPaymentDeliveryInfo({contactInfo, paymentInfo, deliveryInfo, isCrypto, isSameAddress}));
                if (isOrder) {
                  submitOrder();
                } else {
                  // let res = await addToCart();
                  // console.log("res", res);
                  // await dispatch(clearSelected());
                  // if (res) {
                  navigate({
                    pathname: "/profile",
                  });
                  // }
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
