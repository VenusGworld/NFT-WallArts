import React from "react";

const FAQDropDownItem = ({title, desc, click, open}) => {
  return (
  <div
    className="accordion__pane border-b border-gray-200 py-4"
    style={{
      borderColor: "#93939330",
      borderBottomWidth: "2px",
    }}
  >
    <div
      onClick={() => click()}
      className="accordion__pane__toggle font-medium block"
      style={{
        color: "#323b4cc2",
        fontFamily: "sans-serif",
        fontWeight: "800",
        cursor: 'pointer'
      }}
    >
      {title}
    </div>
    {/* <SlideDown>
      
     
    </SlideDown> */}
       
          {<div
              className={"mt-3 text-gray-700 leading-relaxed" +(!open?" h-0":" h-[200px]")}
              style={{
                display: 'inline-block',
                fontFamily: "sans-serif",
                overflow: 'hidden',
                transition: 'height 0.5s 0s ease-in-out'
              }}
            >
              {desc}
            </div>}
  </div>)
}

export default FAQDropDownItem