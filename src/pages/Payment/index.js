import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

import {
  RadioGroup,
  RoundedDropDownSelect,
  RoundedPhoneNumberInput,
  RoundedTextInput,
} from "../../components/Input";
import PaymentMethodCard from "./PaymentMethodCard";
import PreviewPart from "./PreviewPart";

const Payment = () => {
  let countries = Country.getAllCountries();
  // let states = State.getStatesOfCountry(countries[0].isoCode);
  // let cities = City.getCitiesOfState(countries[0].isoCode, states[0].isoCode);
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: countries[20],
    state: State.getStatesOfCountry(countries[0].isoCode)[0],
    city: City.getCitiesOfState(
      countries[0].isoCode,
      State.getStatesOfCountry(countries[0].isoCode)[0].isoCode
    )[0],
  });
  const [statesDeliveryArray, setStatesDeliveryArray] = useState(
    State.getStatesOfCountry(countries[0].isoCode)
  );
  const [citiesDeliveryArray, setCitiesDeliveryArray] = useState(
    City.getCitiesOfState(
      countries[0].isoCode,
      State.getStatesOfCountry(countries[0].isoCode)[0].isoCode
    )
  );

  useEffect(() => {
    console.log('deliveryInfo.country.isoCode', deliveryInfo.country.isoCode,  State.getStatesOfCountry(deliveryInfo.country.isoCode))
    setStatesDeliveryArray(
      State.getStatesOfCountry(deliveryInfo.country.isoCode)
    );
    statesDeliveryArray[0]
      ? setDeliveryInfo({ ...deliveryInfo, state: statesDeliveryArray[0] })
      : setDeliveryInfo({ ...deliveryInfo, state: {} });
    
  }, [deliveryInfo.country]);

  useEffect(() => {
    setCitiesDeliveryArray(
      City.getCitiesOfState(deliveryInfo.country.isoCode, deliveryInfo.state.isoCode)
    )
    citiesDeliveryArray[0]
      ? setDeliveryInfo({ ...deliveryInfo, city: citiesDeliveryArray[0] })
      : setDeliveryInfo({ ...deliveryInfo, city: {} });
  }, [deliveryInfo.state]);

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
                    <RoundedTextInput label="First Name" defaultValue="John" />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput label="Last Name" defaultValue="Doe" />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedPhoneNumberInput
                      label="Phone No."
                      defaultValue="5505623"
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Email"
                      defaultValue="johndoe@zmail.com"
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
                      defaultValue="Oliver Street"
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      defaultValue="235 B"
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="Country"
                      value={countries.findIndex(
                        (x) => x.name === deliveryInfo.country.name
                      )}
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
                              countries.findIndex((x) => x.isoCode === v)
                            ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="State"
                      value={statesDeliveryArray.findIndex(
                        (x) => x.name === deliveryInfo.state.name
                      )}
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
                              statesDeliveryArray.findIndex((x) => x.isoCode === v)
                            ],
                        });
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="City"
                      value={citiesDeliveryArray.findIndex(
                        (x) => x.name === deliveryInfo.city.name
                      )}
                      list={citiesDeliveryArray.map((v) => ({
                        ...v,
                        text: v?.name,
                        value: v?.isoCode,
                      }))}
                      onChangeHandle={(v) => {
                        console.log("city", v);
                        // setCountryDelivery(countries[countries.findIndex((x) => x.isoCode === v)]);
                      }}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Postal Code"
                      defaultValue="94403"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className=" text-[#D3B789] my-8">3. Payment Method</span>
                <div className=" relative w-full">
                  <PaymentMethodCard />
                </div>
                <div className="flex flex-wrap my-10">
                  <RadioGroup
                    list={[
                      "Same as shipping address",
                      "Use a different billing address",
                    ]}
                  />
                </div>
                <div className="flex sm:flex-row flex-col flex-wrap justify-between">
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput label="First Name" defaultValue="John" />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput label="Last Name" defaultValue="Doe" />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Address"
                      defaultValue="Oliver Street"
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Apt / Suite No."
                      defaultValue="235 B"
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput label="City" defaultValue="Grapevine" />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="Country"
                      list={countries}
                      onChangeHandle={() => {}}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedDropDownSelect
                      label="State"
                      list={State.getStatesOfCountry(countries[0].isoCode)}
                      onChangeHandle={() => {}}
                    />
                  </div>
                  <div className=" w-[90%] sm:w-[45%] mb-5">
                    <RoundedTextInput
                      label="Postal Code"
                      defaultValue="94403"
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
