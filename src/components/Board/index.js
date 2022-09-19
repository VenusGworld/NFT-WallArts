import React from 'react';

const Board = ({children}) => {
  return (
    <div className=' bg-[#454E61] rounded-[10px] p-8 text-white'
      style={{'boxShadow': "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)"}}
    >
      {children}
    </div>
  )
}

export default Board