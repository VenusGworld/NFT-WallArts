import React from "react";

const StakingInfoAvatar = (props) => {
  return (
    <div
    className="media-body my-auto media-aside mr-2 align-self-start"
    style={{
      width: "38px",
      height: "38px",
      margin: "10px",
      display: "inline-block",
      marginTop: "10px",
      opacity: "0.9",
    }}
  >
    <span
      className="b-avatar badge-light-primary rounded-circle"
      style={{
        textAlign: "center",
      }}
    >
      <span
        className="b-avatar-custom"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(to bottom right, #4fd354b8 0%, #0096889e 100%)",
          borderRadius: "50%",
        }}
      >
        {props.children}
      </span>
    </span>
  </div>
  )
}

export default StakingInfoAvatar