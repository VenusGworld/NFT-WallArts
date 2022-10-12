import React from "react";

import MainTop from "./top";

const Main = () => {
  return (
    <div
      className="l-12-b2 mt-5 md:pl-11 pl-0"
      style={{
        display: "inline-block",
        width: "calc(100% - 12%)",
        position: "absolute",
        right: "20px",
        float: "right",
        paddingTop: "38px",
      }}
    >
      <MainTop />
    </div>
  );
};

export default Main;
