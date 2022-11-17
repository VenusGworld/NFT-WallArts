import React from "react";

import { useOrder } from "../../hooks/useOrder";
import { useOrderStatus } from "../../hooks/useOrderStatus";
import TimeLine from "./TimeLine";

const TimeLinePart = ({selectedOrderIndex}) => {
  const orders = useOrder();
  const orderStatus = useOrderStatus();
  const order = orders?.data?.data[selectedOrderIndex]
  return (
    <div className="flex flex-col">
      {order?.order_statuses.map((item, i) => (
        <TimeLine key={i} info={{
          title: orderStatus?.data?.data?.filter((s) => s?._id === item?.order_status_id)[0]?.name,
          description: orderStatus?.data?.data?.filter((s) => s?._id === item?.order_status_id)[0]?.description,
          time: item?.ordered_time
        }} last={i === order?.order_statuses?.length - 1} />
      ))}
    </div>
  );
};

export default TimeLinePart;
