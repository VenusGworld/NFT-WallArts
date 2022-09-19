import { RoundedButtonMD, SearchBar } from "../../components/Input"
import RadioButton from "../../components/Input/RadioButton"

const FilterPart = () => {
return(<div className="p-5 flex text-white w-[90%] bg-[#6a6a82] hd-nm border-theme-24 flex-col justify-start text-xl">
  <div className=" text-2xl flex justify-start my-3">Filter :</div>
  <div className="flex justify-between items-center flex-wrap">
    <SearchBar placeholder='Search Items, collections'/>
    <RoundedButtonMD active text='Reset'/>
  </div>
  <div className=" text-2xl flex justify-start my-3">Sale Types :</div>
  <div className="flex justify-start space-x-12 my-5 flex-wrap">
    <div>Not on Sale</div><div>on Sale</div><div>Live Auction</div>
  </div>
  <div className=" text-2xl flex justify-start my-3">Sort Types :</div>
  <div className="flex flex-wrap">
    {['Recently Listed',
'Most Viewed',
'Recently Sold',
'Most Favorited',
'Ending Soon', 
'Price: Low to High', 
'Price: High to Low'].map((sort, i) => {
  return (<div className="flex w-56 my-5"><RadioButton/><div>{sort}</div></div>)
})}
  </div>
</div>)
}

export default FilterPart