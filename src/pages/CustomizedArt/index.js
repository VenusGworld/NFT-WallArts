import React from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../../components/NFTCard/CustomizedArtCard";
import { useItemByCategory } from "../../hooks/useItemByCategory";

const CustomizedArt = () => {
  const [searchParams] = useSearchParams();
  const items = useItemByCategory({category_id: searchParams.get('category')})

  return (
    <div>
      <div className={`w-full h-full mt-20 relative text-white`}>
        <div className="relative">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/image40.png"}
            className="w-full object-cover"
            alt="background"
          />
          <div
            className="absolute xl:text-7xl lg:text-5xl md:text-4xl text-xl top-1/2 font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ textShadow: " 0px 4px 12px rgba(0, 0, 0, 0.25)" }}
          >
            Customized Wall Arts
          </div>
        </div>
        <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start -mt-[8%]">
          <div className="w-[80%] mx-auto">
            <div className="flex flex-col justify-start items-start">
              <div className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-5">
                Select your size
              </div>
              <div className="flex flex-wrap w-full justify-start">
                {/* {data.map((item, i) => (
                  <ItemCard item={item} key={i} />
                ))} */}
                {(items.isLoading && items.data?.data.length === 0)?<div className=" h-96"></div>:(
                  items.data?.data.map((item, i) => (
                    <ItemCard item={item} key={i} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedArt;
