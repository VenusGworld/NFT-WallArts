import React from "react";

const Card = (props) => {
  return (
    <div
      className="box-body intro-y box col-sm-6 col-xl-3 mb-2 mb-xl-0 nnb-31 w-full"
      style={{
        flex: "0 0 25%",
        margin: "0 0.5rem 0 0",
        padding: "0 2%",
      }}
    >
      {props.children}
    </div>
  );
};

export default Card;
