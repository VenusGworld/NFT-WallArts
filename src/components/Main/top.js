import React from "react";

import StakingCard from "./StakingCard";

const MainTop = () => {
  return (
    <div
      className="intro-y box mt-5"
      style={{
        // background: '#2e2e49', 
        borderRadius: '7px',
        boxShadow: 'none'}}
      
    >
      <div className="p-5" style={{
        height: '80px', 
        position: 'relative', 
        padding: '0px'}}
      >
        <div className="card-body">
          <div
            className="row md:overflow-x-visible overflow-x-scroll mb-3"
            style={{
              display: 'flex', 
              paddingLeft: '0px', 
              paddingRight: '1.6rem', 
            }}
            
          >
            <StakingCard
              title='Overall Staked Tokens'
              icon={
                <svg
                  style={{
                    color: 'white'}}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-layers"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              }
              iconBGColor='linear-gradient(to bottom right, #3ae3ec 0%, #28767a 100%)'
              shadowColor='0 5px 10px #c4cdeb'
            />
            <StakingCard
              title='Overall Collected Dividends'
              icon={
                <svg
                  style={{
                    color: 'white'
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
              }
              iconBGColor='linear-gradient(to bottom right, #f1bf64 0%, #f71d36 100%)'
              shadowColor='0 5px 10px #efc2c9'
            />
            <StakingCard
              title='Overall Collected Bonus Tokens'
              icon={
                <svg
                  style={{
                    color:'white'
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
                  className="feather feather-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              }
              iconBGColor='linear-gradient(to bottom right, #ff5dbb 0%, #a870ff 100%)'
              shadowColor='0 5px 10px #e4cbfb'
            />
            <div
              // onclick="location.href='https://avaricetoken.io/'"
              className="intro-y box col-sm-6 col-xl-3 mb-2 mb-xl-0 waht-is-avc"
              style={{
                cursor: 'pointer',
                flex: '0 0 25%',
                maxWidth: '25%',
                margin: '0 0.5rem 0 0',
                padding: '0 2%',
                borderRadius: '7px',
                background: 'linear-gradient(to bottom right, #6edcf0 0%, #4ea1c2 100%)',
                boxShadow: '2px 5px 7px #83c2d2ba'}}
            >
              <h4
                className="card-title font-light text-xs md:text-lg"
                style={{
                  color: 'white',
                  paddingTop: '15px',
                  paddingLeft: '15px'
                }}
              >
                What is Avarice?
              </h4>
              <p
                className="card-text font-small-2 mr-25 mb-0 font-light md:text-lg text-xs"
                style={{
                  color: '#ffffff85',
                  width: '100%',
                  marginTop: '-5px',
                  paddingLeft: '40px',
                }}
              >
                Learn more...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainTop;

