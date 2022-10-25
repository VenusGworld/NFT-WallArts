import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";

import {
  RadioGroup,
  RoundedDropDownSelect,
  RoundedPhoneNumberInput,
  RoundedTextInput,
} from "../../components/Input";
import PaymentMethodCard from "./PaymentMethodCard";
import PreviewPart from "./PreviewPart";
import { connectedAccount } from "../../store/accountReducer";

const Payment = () => {
  const connected_account = useSelector(connectedAccount);
  console.log('connected_account', connected_account);
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
  
  const submitOrder = () => {

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
                      if (v === "crypto") {
                        setPaymentInfo({ ...paymentInfo, paymentMethod: v });
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
                        setPaymentInfo({ ...contactInfo, firstName: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Last Name"
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...contactInfo, lastName: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Address"
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...contactInfo, address: v });
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      onChangeHandle={(v) => {
                        setPaymentInfo({ ...contactInfo, apt_suiteNo: v });
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
                        setPaymentInfo({ ...contactInfo, postalCode: v });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[40%] w-full mx-auto">
            <PreviewPart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
