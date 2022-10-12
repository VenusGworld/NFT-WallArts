import React, { useState } from "react";
import Calendar from "react-calendar";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarInput = ({ list, onChangeHandle }) => {
  const [date, setDate] = useState(new Date());
  const [expanded, expand] = useState(false);
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()) +
        " " +
        month[date.getMonth()] +
        "" +
        ", " +
        date.getFullYear(),
    ].join(", ");
  }
  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!ref?.current?.contains(event?.target)) {
  //       expand(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  // }, [ref]);
  return (
    <div
      className={`relative w-full rounded-full cursor-pointer px-7 py-5  bg-[#4a5367] border border-[#818895]`}
    >
      <div
        className="flex w-full h-full"
        onClick={() => {
          expand(!expanded);
        }}
      >
        {formatDate(date)}
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/calendar.svg"}
          alt=""
          className={`absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2`}
        />
      </div>
      {expanded && (
        <div className="absolute z-10">
          <Calendar
            defaultValue={date}
            onChange={(date) => {
              setDate(date);
              expand(false);
            }}
            nextLabel={
              <img
                loading="lazy"
                src={process.env.PUBLIC_URL + "/img/triangle.svg"}
                alt=""
                className={`w-5 h-5 -my-1 mx-2 rotate-90`}
              />
            }
            prevLabel={
              <img
                loading="lazy"
                src={process.env.PUBLIC_URL + "/img/triangle.svg"}
                alt=""
                className={`w-5 h-5 -my-1 mx-2 -rotate-90`}
              />
            }
            prev2Label={false}
            next2Label={false}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
