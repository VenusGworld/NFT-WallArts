import React from "react";

import RecentEventCard from "./RecentEventCard";

const Sidebar = () => {
  return (
    <div className=" md:block hidden">
      <div
        className="card-title-rv"
        style={{
          borderBottom: "4px solid #3e4252",
          paddingBottom: "8px",
          backgroundColor: "#494f66",
          borderBottomRightRadius: "6px",
          borderBottomLeftRadius: "6px",
          height: "40px",
          marginRight: "0px",
          marginLeft: "0px",
          position: "fixed",
          width: "calc(12.9% - 7px)",
          marginBottom: "50px",
          zIndex: "1000",
          top: "55px",
          left: "0",
        }}
      >
        <h4
          style={{
            fontSize: "16px",
            color: "#ffffff45",
            fontFamily: "sans-serif",
            paddingLeft: "14px",
            paddingTop: "8px",
            fontWeight: "900",
          }}
        >
          Recent Events
        </h4>
      </div>
      <div
        className="recent-events"
        id="sc-2"
        style={{
          zIndex: '10',
          backgroundColor: '#3a3e4c',
          height: '100%',
          display: 'inline-block',
          width: '12.9%',
          position: 'fixed',
          left: '0',
          boxShadow: '4px 0px 7px #0000000a',
          paddingTop: '73px',
          overflowY: 'auto',
          paddingBottom: '30px',
        }}
      >
        <RecentEventCard/>
        <RecentEventCard/>
        <RecentEventCard/>
        <RecentEventCard/>
        <RecentEventCard/>
        <RecentEventCard/>
        <RecentEventCard/>
        <RecentEventCard/>
      </div>
    </div>
  );
};

export default Sidebar;
