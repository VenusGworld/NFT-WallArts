import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

import PreviewPart from "./PreviewPart";
import TimeLinePart from "./TimeLinePart";

const OrderSummary = () => {
  const orders = useOrder();
  const [selectedOrderIndex,selectOrder] = useState(0);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    orders?.data?.data?.forEach((item, i) => {
      if(item?._id === searchParams.get('order_id')) selectOrder(i)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('order_id')])
  
  return (
    <div className="w-full h-full mt-20 relative text-white">
      <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start">
        <div className="w-[80%] mx-auto flex md:flex-row flex-col ">
          <div className="flex justify-start items-start md:w-3/5 w-full pr-8">
            <div className="flex flex-col">
              <span className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-8 text-start">
                Order Summary
              </span>
              <div>
                <TimeLinePart selectedOrderIndex={selectedOrderIndex} />
              </div>
            </div>
          </div>
          <div className="md:w-[40%] w-full ">
            <PreviewPart selectOrder={selectOrder} selectedOrder={selectedOrderIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
