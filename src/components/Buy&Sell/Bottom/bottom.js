import React from "react";
import StakingTable from "./StakingTable";
import Info from "./Info";

const MainBottom = () => {
  return (
    <div className=" flex pt-4 justify-between flex-col md:flex-row ">
      <div className="flex flex-col md:w-[74.7%] w-full">
        <StakingTable/>
      </div>
      <div className="w-full md:w-[24.5%]">
        <Info/>
      </div>
    </div>
  )
}

export default MainBottom;