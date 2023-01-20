import React, { useMemo, useState } from "react";

import ProfileNFTCard from "../../components/NFTCard/ProfileNFTCard";
import { RoundedButtonSM } from "../../components/Input";

const ItemsPart = ({ Items }) => {
  const [selectedPage, selectPage] = useState(0);
  const getPager = useMemo(() => {
    let totalItems = Items.length; 
    let currentPage = selectedPage; 
    let pageSize = 6;
    // default to first page
    currentPage = currentPage || 1;
    // default page size is 10
    pageSize = pageSize || 10
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) { startPage = 1; endPage = 10; } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    // let startIndex = (currentPage - 1) * pageSize;
    // let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    // return an object with all pager properties required by the view
    let a = pageSize * (selectedPage + 1) > Items.length ? Items.length % pageSize : pageSize;
    let arr = [];
    for (let index = 0; index < a; index++)
      arr.push(Items[selectedPage * pageSize + index]);
    return {
      // totalItems: totalItems,
      // currentPage: currentPage,
      // pageSize: pageSize,
      // totalPages: totalPages,
      // startPage: startPage,
      // endPage: endPage,
      // startIndex: startIndex,
      // endIndex: endIndex,
      selectedItems: arr,
      pages: pages
    };
  }, [Items, selectedPage])
  return (
    <>
      <div className="flex flex-wrap justify-start sm:w-[90%] w-[70%]">
        {getPager?.selectedItems.map((item, i) => (
          <ProfileNFTCard item={item} key={i} />
        ))}
      </div>
      <div className="flex space-x-1 my-3 items-center justify-center flex-wrap text-sm">
        {selectedPage !== 0 && getPager?.pages.length>0?<div
          className=" text-[#D3B789] mx-3 cursor-pointer"
          onClick={() => {
            selectPage(selectedPage - 1);
          }}
        >
          Prev
        </div>:null}
        {getPager?.pages.map((p, i) => (
          <RoundedButtonSM
            key={i}
            text={p}
            active={selectedPage === p-1}
            onButtonClick={() => {
              selectPage(p-1);
            }}
          />
        ))}
        {selectedPage !== getPager?.pages.length-1 && getPager?.pages.length>0?
        <div
          className=" text-[#D3B789] mx-3 cursor-pointer text-sm"
          onClick={() => {selectPage(selectedPage + 1);}}
        >
          Next
        </div>:null}
      </div>
    </>
  );
};

export default ItemsPart;
