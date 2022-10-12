import { RadioGroup, RoundedButtonMD, SearchBar } from "../../components/Input";

const FilterPart = () => {
  return (
    <div className="p-5 flex text-white w-[90%] bg-[#414b5e] mb-10 hd-nm border-theme-24 flex-col justify-start text-xl">
      <div className=" text-2xl flex justify-start my-3">Filter :</div>
      <div className="flex justify-between items-center flex-wrap">
        <div className=" w-1/3">
          <SearchBar placeholder="Search Items, collections" />
        </div>
        <RoundedButtonMD active text="Reset" />
      </div>
      <div className=" text-2xl flex justify-start my-3">Sale Types :</div>
      <div className="flex justify-start space-x-16 my-5 flex-wrap">
        <div>Not on Sale</div>
        <div>on Sale</div>
        <div>Live Auction</div>
      </div>
      <div className=" text-2xl flex justify-start my-3">Sort Types :</div>
      <div className="flex flex-wrap w-4/5">
        <RadioGroup
          list={[
            "Recently Listed",
            "Most Viewed",
            "Recently Sold",
            "Most Favorited",
            "Ending Soon",
            "Price: Low to High",
            "Price: High to Low",
          ]}
        />
      </div>
    </div>
  );
};

export default FilterPart;
