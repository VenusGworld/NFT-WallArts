import React from "react";

import Staking from "./Staking";
import Card from "../../../Card";
import Chart from "./Chart";
import StakingInfo from "./StakingInfo";

const StakingPart = () => {
  return (
    <div className="">
      <Card>
        <div className=" flex flex-col">
          <div className="flex md:flex-row flex-col">
            <Staking/>
            <Chart/>
          </div>
          <StakingInfo/>
        </div>
      </Card>
    </div>
  )
}

export default StakingPart;