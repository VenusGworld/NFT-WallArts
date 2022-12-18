import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "../../components/Board";
import { useOrder } from "../../hooks/useOrder";
import { useOrderStatus } from "../../hooks/useOrderStatus";
import PreviewCard from "./PreviewCard";


const PreviewPart = ({selectOrder, selectedOrder}) => {
  const orders = useOrder();
  const orderStatus = useOrderStatus();
  const navigate = useNavigate();

  return (
    <Board>
      <div className="flex flex-col sm:items-start items-center h-screen overflow-y-auto">
        <span className=" text-3xl mt-3">Ordered Products</span>
        <div className="flex flex-col my-3 w-full">
          {orders?.data?.data?.map((item, i) => {
            return <PreviewCard isSelected={selectedOrder===i} onClickHandle={() => {
              navigate({
                pathname: "/order_summary",
                search: `?order_id=${item._id}`,
              }, {replace: true});
            }} info={item} key={i} status={
              orderStatus.isLoading?[]:orderStatus?.data?.data.filter((status) => status._id === item?.order_statuses[item?.order_statuses?.length-1]?.order_status_id)
            }/>;
          })}
        </div>
        {/* <div className=" my-5 flex w-full justify-between items-center">
          <span className=" text-[#818DA9] text-lg">Total Price</span>
          <div className="flex flex-col">
            <span className="text-[#D3B789] text-xl">78.2ETH</span>
            <span className=" text-sm">(5876 USD)</span>
          </div>
        </div>
        <div className=" w-full">
          <RoundedButtonMD
            text="Confirm Order"
            onButtonClick={() => {
              navigate("/");
            }}
            active
            fullWidth
          />
        </div> */}
      </div>
    </Board>
  );
};

export default PreviewPart;
