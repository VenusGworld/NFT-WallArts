import React, { useMemo } from "react";

import CategoryItem from "../../components/CategoryItem";
import { NumberInputSM, RoundedDropDownSelectSM } from "../../components/Input";
import { useItem } from "../../hooks/useItem";


const PreviewCard = ({ info, key, onChangeItemInfo, onChangeQuantity }) => {
  const {
    image_for_printing,
    name_for_printing,
    item_info,
    quantity,
    total_price_eth,
  } = info;
  const Items = useItem();
  // console.log('item_info',item_info)
  const ListItems = useMemo(() => {
    let arr = [];
    Items?.data?.data?.forEach((v) => {
      let flag = false;
      let data = {}
      if (info?.item_info?.category_id) {
        if (v?.category_id === info?.item_info?.category_id) {
          flag = true
          data = {
            ...v,
            text: v?.width + "X" + v?.height + "cm" ,
            value: v?._id
          }
        }
      }
      if (flag) arr.push(data);
    }
      // return arr;
    )
    return arr;
  }, [info?.item_info, Items?.data?.data]);

  return (
    <div className="flex sm:space-x-5 w-full items-start md:justify-center justify-between">
      <div className="rounded-2xl flex flex-col space-y-5 justify-center items-center w-28">
        <img
          src={image_for_printing}
          alt=""
          className="w-full box-border flex justify-center items-center rounded-2xl"
        />

      </div>
      <div className="flex flex-col w-[60%]">
        <div className="flex flex-col items-start">
        <div className="flex items-start"><CategoryItem id={item_info?.category_id} /></div>
        <div className="flex items-start"><span className="flex sm:text-xl text-lg text-start">{name_for_printing}</span></div>

        </div>
        <div className="flex justify-between sm:flex-row flex-col w-full space-x-1">
          <div className="flex flex-col items-start w-full">
            <span className="w-full">
              {Items?.data?.data ?
                <RoundedDropDownSelectSM
                  label="Frame Size"
                  value={
                    ListItems?.findIndex(
                      (x) => x._id === info?.item_info?._id
                    ) > 0
                      ? ListItems?.findIndex(
                        (x) => x._id === info?.item_info?._id
                      )
                      : 0
                  }
                  list={ListItems}
                  onChangeHandle={async (v) => {
                    if (info?.item_info?._id !== v) {
                      onChangeItemInfo(Items?.data?.data[Items?.data?.data?.findIndex((x) => x._id === v)])
                    }

                  }}
                /> : null}
            </span>
          </div>
          <div className="flex flex-col items-start sm:space-y-2 space-y-0">
            <span className="text-sm text-[#BFC8DD]">Quantity</span>
            <NumberInputSM
              value = {quantity}
              onChangeHandle={(v) => {
                onChangeQuantity(v)
                // if (nftInfo?.isBulk) {
                //   let min = 100000;
                //   let dis = 0;
                //   nftInfo?.bulk_pricing.forEach((p) => {
                //     if (
                //       Number(v) - p.quantity >= 0 &&
                //       min > Number(v) - p.quantity
                //     ) {
                //       min = Number(v) - p.quantity;
                //       dis = p.discount;
                //     }
                //   });
                //   setDiscount(dis);
                // }
                // setquantity(Number(v));
              }}
            />
          </div>
        </div>
        {item_info?.selected_color?<div className="flex space-x-3 items-center">
          <span className="text-sm text-[#BFC8DD]">Selected Colour:</span>
          {item_info?.color.map((colour, i) => {
            if(i === item_info?.selected_color) {return(
            <div
              className={`relative bg-${colour} p-3 rounded-full border`}
              key={i}
            ></div>
          )} else return <div key={i}></div>}
          )}
        </div>:null}
        
        <div className="flex space-x-3 items-center">
          <span className="text-sm text-[#BFC8DD]">Price:</span>
          <span>{Number(total_price_eth).toFixed(3)} ETH</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
