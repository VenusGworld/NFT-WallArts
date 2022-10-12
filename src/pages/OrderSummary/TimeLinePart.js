import React from "react";
import TimeLine from "./TimeLine";

const data = [
  {
    title: "1. Order",
    description: "Order Request Accepted",
    time: "12:10 PM, 28 March 2022",
  },
  {
    title: "2. Payment",
    description: "Payment Done by VISA Debit Card",
    time: "11:58 AM, 28 March 2022",
  },
  {
    title: "3. Processing",
    description: "Product Picked & Started Processing",
    time: "10:52 AM, 30 March 2022",
  },
  {
    title: "4. Printing",
    description: "Product Picked & Started Processing",
    time: "10:52 AM, 30 March 2022",
  },
  {
    title: "5. Shipped",
    description: "Order Shipped by DTH Service",
    time: "10:40 AM, 1 April 2022",
    detail: "235B, Carter Street, New York, 94403, USA",
  },
  {
    title: "6. Delivered",
    description: "Your Product is Out for Delivery",
    time: "2:30 PM, 1 April 2022",
  },
];

const TimeLinePart = () => {
  return (
    <div className="flex flex-col">
      {data.map((item, i) => (
        <TimeLine key={i} info={item} last={i === data.length - 1} />
      ))}
    </div>
  );
};

export default TimeLinePart;
