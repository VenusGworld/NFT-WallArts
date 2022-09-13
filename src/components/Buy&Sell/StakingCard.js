import React from "react";

import Card from "../Card";

const StakingCard = ({
  title,
  icon,
  iconBGColor,
  shadowColor
}) => {
  return (
  <Card>
    <div
      className="media"
      style={{
        display: 'flex', 
        alignItems: 'flex-start', 
        height: '80px'}}
    >
      <div className="media-body my-auto text-gray-600" style={{
        textAlign: 'start',
        flex: '1'}}>
        <h4 className=" font-medium mb-0" style={{
          fontSize: '15px'}}>
          {title}
        </h4>
        <p
          className="card-text font-small-3 mb-0 gd-31"
          style={{
            fontSize: '18px', fontWeight: 'bold', fontFamily: 'sans-serif'}}
        >
          --
        </p>
      </div>
      <div
        className="media-body my-auto media-aside mr-2 align-self-start"
        style={{
          width: '48px',
          height: '48px',
          // backgroundColor: 'rgba(115, 103, 240, 0.12)',
          color: '#7367f0',
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: 0}}
        >
        <span
          className="b-avatar badge-light-primary rounded-circle"
          style={{
            textAlign: 'center'}}
        >
          <span
            className="b-avatar-custom"
            style={{
              borderRadius: '50%',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: iconBGColor,
              boxShadow: shadowColor,
            }}
          >
            {
              icon
            }
          </span>
        </span>
      </div>
    </div>
  </Card>
  )
}

export default StakingCard;