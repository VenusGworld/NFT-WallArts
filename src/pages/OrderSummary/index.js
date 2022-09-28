import React from 'react';
import PreviewPart from './PreviewPart';
import TimeLinePart from './TimeLinePart';

const OrderSummary = () => {
  return (
    <div className="w-full h-full mt-20 relative text-white">
      <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start">
        <div className="w-[80%] mx-auto flex">
          <div className="flex justify-start items-start w-3/5 pr-8">
            <div className="flex flex-col">
              <span className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-8 text-start">
              Order Summary
              </span>
              <div>
                <TimeLinePart/>
              </div>
            </div>
          </div>
          <div className="w-[5/12] mx-auto">
            <PreviewPart/>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary