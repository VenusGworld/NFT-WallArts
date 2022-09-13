import React from "react";

const Input = ({placeholder, disabled, type, img}) => {
  let image = img?(type === 'white'?{
    backgroundImage: "url("+img+")",
    backgroundSize: "24px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
  }:{
    background: 'linear-gradient(rgb(48 51 61 / 56%), rgb(55 58 68 / 55%)), url('+img+') no-repeat right 1px center',
    backgroundSize: '20px',
    backgroundColor: 'rgb(38 40 53 / 33%)'
  }):{};
  return (
    <input
      placeholder={placeholder}
      disabled = {disabled?true:false}
      className={type === 'white'?"stake-inp-days w-full md:w-48 ":'input border flex-1 user-data-3'}
      style={type === 'white'?{
        display: "block",
        margin: "15px 20px 10px 20px",
        background: "#f3f2f7",
        border: "3px solid #6b6e7c61",
        borderRadius: "4px",
        height: "36px",
        padding: "5px",
        boxShadow: "3px 4px 4px #9294a063",
        color: "#abbac6",
        fontWeight: "500",
        ...image
      }:{
        textAlign: 'center',
        color: '#91979f',
        fontWeight: '900',
        borderRadius: "4px",
        background: 'linear-gradient(rgb(48 51 61 / 56%), rgb(55 58 68 / 55%))',//, url(../panel/dist/imgs/avarice_logo_3.png) no-repeat right 4px center
        backgroundColor: 'rgb(38 40 53 / 33%)',
        border: '2px solid #3a3e507d',
        fontSize: '16px',
        width: '90%',
        padding: '3px',
        ...image
      }}
    />
  )
}

export default Input;