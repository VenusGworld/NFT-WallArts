import React from "react";

const RecentEventCard = () => {
  return (
    <div
      id="1657551410"
      // onclick="window.open('https:/'/bscscan.com/tx/0x5bd81da6ca7bd33e6b774bf7c1d69dcd9e40b76362056f22fa003ee09212f39e')',
      style={{ 
        backgroundColor: '#406f90',
        cursor: 'pointer',
        margin: '6px',
        borderRadius: '3px',
        height: 'auto',
        color: '#ffffffb8',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#345f81',
          borderRadius: '3px',
          height: '20px',
          color: '#ffffff4f',
          textAlign: 'center',
          fontWeight: '900',
          fontFamily: 'sans-serif'
        }}
      >
        0x71f...4f9f9
      </div>
      <div
        style={{
          borderRadius: '3px',
          height: '20px',
          color: '#ffffffb8',
          textAlign: 'center',
          display: 'contents',
          fontSize: 'inherit',
          fontWeight: '400',
          fontFamily: 'sans-serif'
        }}
      >
        5506 AVC Stake sell offer for 5.66 BNB
      </div>
      <div
        style={{
          fontSize: '12px',
          borderRadius: '3px',
          color: '#ffffff52',
          textAlign: 'right',
          marginRight: '3px',
          fontFamily: 'sans-serif'
        }}
      >
        1 hour/s ago
      </div>
    </div>
  );
};

export default RecentEventCard;
