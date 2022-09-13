import React, {useState} from "react";
import FAQDropDownItem from "./PageFAQDropDownItem";

let FaqData = [
  { title: "What is staking?", desc: "stakes will accrue daily BUSD dividends and BAVC bonus tokens based on the amount of BAVC tokens staked. At the end of every day a daily BUSD pool will be calculated and it will be shared and allocate to all the open stakes which will be available for user to withdraw when the stake ends." },
  { title: "What is the BNB pool?", desc: "94% of all BUSD that enters the daily auction lobby is pooled to be distributed back out to the stakers which we call it the dividends pool." },
  { title: "How is the dividends pool calculated?", desc: "dividend pool is split over a period of time based on the contracts day, For example, assuming day 3 ended with a 100 Lobby BUSD entry, that BUSD will be divided by 3 as it's day 3, and split out over 3 days in chunks of 33.3 BUSD. Another example; day 10 ends with 100 BUSD, these BUSD are split into chunks of 10 which are sent out over 10 days. This caps at day 60" },
  { title: "What are bonus tokens?", desc: "Users receive bonus BAVC tokens on their active stakes which is highly based on the duration of their stakes. Longer the duration higher the bonus percentage." },
  { title: "Can I cancel my stake?", desc: "There is no feature in contract to cancel a stake after you started it however you can sell your stakes at the Buy&Sell section." },
  { title: "When will I receive my dividends ?", desc: "After the stake days completed you will be able to end you stake and collect your BUSD and BAVC tokens." },
];

const PageFaq = () => {
  const[openstatus,openitem] = useState([false,false,false,false,false,false]);
  const openFaqData = (i) => {
    let arr = [false,false,false,false,false,false];
    arr[i] = !openstatus[i];
    openitem(arr);
  }

  return (
    <div
    className="p-5 section-mb-53"
    style={{
      height: "auto",
      position: "relative",
      padding: "5px",
      boxShadow: "0 3px 20px #0000000f",
      top: "11px",
      background: "#ffffff",
      borderRadius: "7px",
      width: "100%",
      float: "right",
      marginBottom: "20px",
    }}
  >
    <div
      className="flex items-center p-5 border-b border-gray-200"
      style={{
        padding: "1px",
        justifyContent: "space-between",
        borderBottom: "1px solid #eaedf1",
        paddingBottom: "8px",
        backgroundColor: "#e1e0e6de",
        borderTopRightRadius: "6px",
        borderTopLeftRadius: "6px",
        marginLeft: "0px",
        marginRight: "0px",
        paddingLeft: "10px",
        paddingTop: "7px",
      }}
    >
      <h2
        className="font-medium text-base mr-auto"
        style={{
          color: "#a8a7af",
        }}
      >
        Page FAQ
      </h2>
    </div>
    <div
      className="accordion px-5 py-1"
      style={{
        padding: "6px",
        backgroundColor: "#e5e4e945",
      }}
    >
      {FaqData.map((f,i) => 
        <FAQDropDownItem title={f.title} desc={f.desc} key={i} click={() => openFaqData(i)} open={openstatus[i]}/>
      )}
    </div>
  </div>
  )
}

export default PageFaq;