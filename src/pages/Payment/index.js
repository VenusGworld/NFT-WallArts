import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

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


const Payment = () => {
  const connected_account = useSelector(connectedAccount);
  const [searchParams] = useSearchParams();
  let countries = Country.getAllCountries();
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
  });
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
    paymentMethod: "visa",
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
  const [isCrypto, setIsCrypto] = useState(false);
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
    })
  }
  const success = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    })
  }
  const checkInputFormValidation = (arr) => {
    let flag = true;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if(element.v === '' || element.v === undefined || !element.v) {
        error(`Input ${element.err_msg}!`);
        flag = false
      }
    }
    return flag;
  }
  const submitOrder = async () => {
    // const result = await axios
    // .get(`${process.env.REACT_APP_BACKEND_URL}/api/item/${searchParams.get("item")}`)
    // .catch((err) => {
    //   console.log(err);
    // });
    // console.log('aaaa',result.data.data)
    
    let arr = [];

    if(!isCrypto && !isSameAddress) {
      arr = [{v: paymentInfo.firstName, err_msg: 'Payment Information First Name'},
      {v: paymentInfo.lastName, err_msg: 'Payment Information Last Name'},
      {v: paymentInfo.address, err_msg: 'Payment Information Address'},
      {v: paymentInfo.apt_suiteNo, err_msg: 'Payment Information Apt / Suite No.'},
      {v: paymentInfo.postalCode, err_msg: 'Payment Information Postal Code'}]
    }
    let {firstName, lastName, phoneNo, email} = contactInfo;
    let {address, apt_suiteNo, postalCode, country, state, city} = deliveryInfo;
    let shouldBeCheckedValues = [
      {v: firstName, err_msg: 'Contact Information First Name'},
      {v: lastName, err_msg: 'Contact Information Last Name'},
      {v: phoneNo, err_msg: 'Contact Information Phone Number'},
      {v: email, err_msg: 'Contact Information Email'},
      {v: address, err_msg: 'Delivery Information Address'},
      {v: apt_suiteNo, err_msg: 'Delivery Information Apt / Suite No.'},
      {v: postalCode, err_msg: 'Delivery Information Postal Code'},
      ...arr
    ]
    if(
      checkInputFormValidation(shouldBeCheckedValues)
    ) {
      const formData = {};
      formData.item_id = searchParams.get("item");
      formData.quantity = Number(searchParams.get("quantity"));
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
      formData.payment_first_name = (isSameAddress||isCrypto)?firstName:paymentInfo.firstName;
      formData.payment_last_name = (isSameAddress||isCrypto)?lastName:paymentInfo.lastName;
      formData.payment_address = (isSameAddress||isCrypto)?address:paymentInfo.address;
      formData.payment_apt_suite_No = (isSameAddress||isCrypto)?apt_suiteNo:paymentInfo.apt_suiteNo;
      formData.payment_type = paymentInfo.paymentMethod;
      formData.payment_country = (isSameAddress||isCrypto)?country.isoCode:paymentInfo.country.isoCode;
      formData.payment_state = (isSameAddress||isCrypto)?state.isoCode:paymentInfo.state.isoCode;
      formData.payment_city = (isSameAddress||isCrypto)?city.name:paymentInfo.city.name;
      formData.payment_postal_code = (isSameAddress||isCrypto)?postalCode:paymentInfo.postalCode;
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/order/`, formData)
        .then((res) => {
          if (res.status === 201) {
            success("Saved Successfully!");
            // console.log(res)
          }
        })
        .catch((err) => {
          error(err.response.data.message);
          console.log(err);
        });
    }
  }

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
                      checkedId={isSameAddress?0:1}
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
            <PreviewPart orderClickHandle={() => {submitOrder()}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
