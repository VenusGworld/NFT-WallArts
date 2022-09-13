import React from "react";
import { useSelector } from "react-redux";

import { isConnected, connectedAccount } from "../../../store/accountReducer"
import Input from "../../Input";
import PageFaq from "./PageFaq";

const Info = () => {
  const is_Connected = useSelector(isConnected);
  const account = useSelector(connectedAccount);
  return (
    <div
      className=" mc-mb-23"
      style={{
        display: "inline-block",
        background: "none",
        float: "right",
      }}
    >
      <div
        className="p-5"
        style={{
          height: "310px",
          position: "relative",
          padding: "0",
        }}
      >
        <div
          className="bcs-mb-32"
          style={{
            display: "inline-block",

            float: "right",
          }}
        >
          <div
            className="intro-y col-span-12 sm:col-span-6"
            style={{
              textAlign: "center",
              marginBottom: "80px",
              borderRadius: "10px",
              marginTop: "5px",
              backgroundColor: "#2d303e",
              boxShadow: "0 3px 15px #0000005e",
              zIndex: "49",
              // opacity: "0",
              position: "relative",
              // transform: "translateY(50px)",
              animation: "0.4s intro-y-animation ease-in-out 0.33333s",
              animationFillMode: "forwards",
              animationDelay: "0.1s",
              margin: "0",
              height: "435px",
            }}
          >
            <div
              className="c-square-actived-ex floating"
              style={{
                marginTop: "20px",
                borderRadius: "30px",
                transform: "translate(0px, 0px)",
                display: "inline-block",
                width: "fit-content",
                paddingRight: "15px",
                paddingLeft: "15px",
                height: "50px",
                backgroundImage:
                  "linear-gradient(45deg, rgb(228 53 102) 0%, rgb(235 75 80) 100%)",
                boxShadow:
                  "0 3px 4px rgb(0 0 0 / 20%), inset 0 0 10px 3px rgb(0 0 0 / 20%), 0 3px 20px rgb(228 53 102 / 30%), 0 3px 25px rgb(235 75 80 / 48%)",
                animationName: "floating",
                animationDuration: "3s",
                animationIterationCount: "infinite",
                animationTimingFunction: "ease-in-out",
              }}
            >
              <span
                className="c-square-span square-ex-span"
                style={{
                  color: "#ffffff66",
                  fontSize: "22px",
                  fontWeight: "900",
                  fontFamily: "sans-serif",
                  top: "6px",
                  lineHeight: "50px",
                }}
              >
                {!is_Connected?'0x000...0000':account.substring(0, 5) + '...'+account.substring(account.length-4, account.length)}
              </span>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "30px",
                paddingBottom: "10px",
                paddingRight: "7px",
                paddingLeft: "7px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "49%",
                }}
              >
                <div
                  style={{
                    fontWeight: "900",
                    color: "#867885",
                    paddingBottom: "3px",
                    fontSize: "16px",
                    display: "inline-block",
                    paddingRight: "2%",
                  }}
                >
                  Balance:
                </div>
                <Input disabled={true} type="black" img="bnb_logo.png" />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "49%",
                }}
              >
                <div
                  style={{
                    fontWeight: "900",
                    color: "#867885",
                    paddingBottom: "3px",
                    fontSize: "16px",
                    display: "inline-block",
                    paddingRight: "2%",
                  }}
                >
                  Tokens:
                </div>
                <Input disabled={true} type="black" img="avarice_logo_3.png" />
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "5px",
                paddingBottom: "10px",
                paddingRight: "7px",
                paddingLeft: "7px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "900",
                    color: "#867885",
                    paddingBottom: "3px",
                    fontSize: "16px",
                    display: "inline-block",
                    paddingRight: "2%",
                  }}
                >
                  your all-time staked:
                </div>
                <Input disabled={true} type="black" img="avarice_logo_3.png" />
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "5px",
                paddingBottom: "10px",
                paddingRight: "7px",
                paddingLeft: "7px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "900",
                    color: "#867885",
                    paddingBottom: "3px",
                    fontSize: "16px",
                    display: "inline-block",
                    paddingRight: "2%",
                  }}
                >
                  your all-time divs:
                </div>
                <Input disabled={true} type="black" />
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "5px",
                paddingBottom: "10px",
                paddingRight: "7px",
                paddingLeft: "7px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "900",
                    color: "#867885",
                    paddingBottom: "3px",
                    fontSize: "16px",
                    display: "inline-block",
                    paddingRight: "2%",
                  }}
                >
                  Referral Bonus:
                </div>
                <div>
                  <div
                    className="copy-ref"
                    // onclick="copyreflink()"
                    style={{
                      position: "absolute",
                      opacity: "0.7",
                      backgroundColor: "#c32849",
                      height: "34px",
                      width: "34px",
                      padding: "3px 1px",
                      border: "3.5px solid #df454e",
                      borderRadius: "6px",
                      marginLeft: "5%",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      style={{
                        width: "24px",

                        fill: "#ffffffba",
                      }}
                    >
                      <path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"></path>
                    </svg>
                  </div>
                  <Input disabled={true} type="black" img="avarice_logo_3.png" />
                </div>
              </div>
            </div>
            <div
              className="layer apps_craft_layer_z bottom-0"
              data-depth="0.20"
              style={{
                position: "absolute",
                display: "block",
                left: "0px",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                /* filter: 'drop-shadow(2px 4px 6px black)',
                 */
                zIndex: "-100",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/home-gradiant-bg-2.png"}
                alt="Home Gradient Background 2"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <PageFaq/>
      </div>
    </div>
  );
};

export default Info;
