import React from "react";
import StakingInfoAvatar from "./StakingInfoAvatar";

const StakingInfo = () => {
  return (
    <div
      style={{
        marginTop: "-15px",
      }}
    >
      <div
        style={{
          height: "2.5px",
          width: "100%",
          background: "#e3e3e36e",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "-5px",
          textAlign: 'start'
        }}
      >
        <div
          style={{
            width: "33%",
            height: "50px",
            display: "inline-block",
            borderRight: "1.5px solid #f3f3f3",
          }}
        >
          <StakingInfoAvatar>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{
                width: "50%",
                fill: "white",
              }}
            >
              <path d="M336 0h-288C22.38 0 0 22.38 0 48v416C0 489.6 22.38 512 48 512h288c25.62 0 48-22.38 48-48v-416C384 22.38 361.6 0 336 0zM64 208C64 199.2 71.2 192 80 192h32C120.8 192 128 199.2 128 208v32C128 248.8 120.8 256 112 256h-32C71.2 256 64 248.8 64 240V208zM64 304C64 295.2 71.2 288 80 288h32C120.8 288 128 295.2 128 304v32C128 344.8 120.8 352 112 352h-32C71.2 352 64 344.8 64 336V304zM224 432c0 8.801-7.199 16-16 16h-128C71.2 448 64 440.8 64 432v-32C64 391.2 71.2 384 80 384h128c8.801 0 16 7.199 16 16V432zM224 336c0 8.801-7.199 16-16 16h-32C167.2 352 160 344.8 160 336v-32C160 295.2 167.2 288 176 288h32C216.8 288 224 295.2 224 304V336zM224 240C224 248.8 216.8 256 208 256h-32C167.2 256 160 248.8 160 240v-32C160 199.2 167.2 192 176 192h32C216.8 192 224 199.2 224 208V240zM320 432c0 8.801-7.199 16-16 16h-32c-8.799 0-16-7.199-16-16v-32c0-8.801 7.201-16 16-16h32c8.801 0 16 7.199 16 16V432zM320 336c0 8.801-7.199 16-16 16h-32c-8.799 0-16-7.199-16-16v-32C256 295.2 263.2 288 272 288h32C312.8 288 320 295.2 320 304V336zM320 240C320 248.8 312.8 256 304 256h-32C263.2 256 256 248.8 256 240v-32C256 199.2 263.2 192 272 192h32C312.8 192 320 199.2 320 208V240zM320 144C320 152.8 312.8 160 304 160h-224C71.2 160 64 152.8 64 144v-64C64 71.2 71.2 64 80 64h224C312.8 64 320 71.2 320 80V144z"></path>
            </svg>
          </StakingInfoAvatar>
          <div
            style={{
              display: "inline-block",

              paddingTop: "5px",

              verticalAlign: "top",
            }}
          >
            <p
              style={{
                fontFamily: "roboto",

                fontWeight: "500",

                color: "#00000061",

                paddingTop: "3px",
              }}
            >
              Bonus you will receive:
            </p>
            <p
              className="uns-11"
              style={{
                fontSize: "13px",

                fontWeight: "bold",

                fontFamily: "sans-serif",

                color: "#bcbcbc",
              }}
            >
              [fill the values to calculate]
            </p>
          </div>
        </div>
        <div
          style={{
            width: "33%",
            height: "50px",
            display: "inline-block",
            borderRight: "1.5px solid #f3f3f3",
          }}
        >
          <StakingInfoAvatar>
            <svg
              style={{
                width: "50%",
                fill: "white",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path>
            </svg>
          </StakingInfoAvatar>
          <div
            style={{
              display: "inline-block",

              paddingTop: "5px",

              verticalAlign: "top",
            }}
          >
            <p
              style={{
                fontFamily: "roboto",

                fontWeight: "500",

                color: "#00000061",

                paddingTop: "3px",
              }}
            >
              Today Staked Tokens:
            </p>
            <p
              className="uns-12"
              style={{
                fontSize: "13px",

                fontWeight: "bold",

                fontFamily: "sans-serif",

                color: "#000000b3",
              }}
            >
              -- AVC
            </p>
          </div>
        </div>
        <div
          style={{
            width: "33%",
            height: "50px",
            display: "inline-block",
            borderRight: "1.5px solid #f3f3f3",
          }}
        >
          <StakingInfoAvatar>
            <svg
                style={{
                  color: "white",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-cloud-drizzle"
              >
                <line x1="8" y1="19" x2="8" y2="21"></line>
                <line x1="8" y1="13" x2="8" y2="15"></line>
                <line x1="16" y1="19" x2="16" y2="21"></line>
                <line x1="16" y1="13" x2="16" y2="15"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="12" y1="15" x2="12" y2="17"></line>
                <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
              </svg>
          </StakingInfoAvatar>
          <div
            style={{
              display: "inline-block",
              paddingTop: "5px",
              verticalAlign: "top",
            }}
          >
            <p
              style={{
                fontFamily: "roboto",
                fontWeight: "500",
                color: "#00000061",
                paddingTop: "3px",
              }}
            >
              Total available dividends:
            </p>
            <p
              className="uns-13"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                color: "#000000b3",
              }}
            >
              -- BNB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingInfo;
