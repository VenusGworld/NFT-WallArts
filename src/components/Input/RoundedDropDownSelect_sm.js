import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const RoundedDropDownSelectSM = ({ list, onChangeHandle, label, value }) => {
  const optionRef = useRef([]);
  const selectRef = useRef(null);
  const handleClickOutside = () => {
    if (expanded) setExpanded(!expanded);
  };
  
  const ref = useDetectClickOutside({ onTriggered: handleClickOutside });
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, selectItem] = useState(value > 0 ? value : 0);
  const [word, setWord] = useState('')
  const [currentIndex, setindex] = useState(undefined)

  useEffect(() => {
    if(list) {
      if(!list[value > 0 ? value : 0] || !list[value > 0 ? value : 0]['value']) {
        if(list[0] && list[0]['value']) onChangeHandle(list[0]['value']);
      }
      else onChangeHandle(list[value > 0 ? value : 0]['value']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (expanded && list?.length>0 && list) {
      function handleKeyDown(e) {
        if (e.key.length === 1) {
          let f = undefined;
          let flag = true;
          if (word === e.key) {
            if (list[currentIndex + 1]?.text?.toUpperCase()?.indexOf(e.key.toUpperCase()) === 0) {
              f = currentIndex + 1;
              flag = false
            }
          }
          if (flag) {
            for (let index = 0; index < list?.length; index++) {
              const element = list[index];
              if (element?.text.toUpperCase().indexOf(e.key.toUpperCase()) === 0) {
                f = index;
                break;
              }
            }
          }
          if (f) {
            optionRef.current[f].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
            optionRef.current[f].style.backgroundColor = "gray"
            for (let index = 0; index < list.length; index++) {
              if (f !== index)
                optionRef.current[index].style.backgroundColor = "inherit"
            }
          }
          setindex(f)
          setWord(e.key);
        }
      }
      document.addEventListener('keydown', handleKeyDown);
      // Don't forget to clean up
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
    else {
      setWord('')
      for (let index = 0; index < list.length; index++) {
        optionRef.current[index].style.backgroundColor = "inherit"
      }
    }
  }, [expanded, word, list, currentIndex]);
  if (!list?.length || list?.length === 0) return <div
    ref={selectRef}
    className={`relative flex flex-col justify-start items-start sm:space-y-0 space-y-2  w-full cursor-pointer ${!expanded && "overflow-hidden"
      } transition-all`}
  ></div>
  return (
    <div
      ref={selectRef}
      className={`relative flex flex-col justify-start items-start sm:space-y-2 space-y-0 w-full cursor-pointer ${!expanded && "overflow-hidden"
        } transition-all`}
    >
      <span className="text-sm text-[#BFC8DD]">{label}:</span>
      <div
        className={`relative w-full cursor-pointer px-5 py-1 ${expanded ? " bg-[#57637C] overflow-hidden " : "  bg-[#4a5367] "
          } border border-[#818895]`}
        ref={ref}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="flex text-sm">
          {list[selectedItem]?.text && list[selectedItem]?.text}
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/triangle.svg"}
            alt=""
            className={`absolute w-3 h-3 right-1 top-1/2 -translate-y-1/2 transition-all ${!expanded && " rotate-180"
              }`}
          />
        </div>
      </div>
      {
        <div
          className={` ${!expanded
            ? " -top-[500px] translate-y-0 transition-all h-full "
            : " top-16"
            } z-50 transition-all overflow-y-auto h-40 bg-[#454E61] p-4 text-white text-sm absolute -bottom-2 flex flex-col items-start w-full -left-0`}
          style={{
            boxShadow:
              "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)",
          }}
        >
          {list.map((item, i) => (
            <div
              key={i}
              ref={el => optionRef.current[i] = el}
              onClick={() => {
                selectItem(i);
                setExpanded(false);
                onChangeHandle(item["value"]);
              }}
              className={`${selectedItem === i
                ? "text-[#D3B789] border-l border-l-gray-400 border-r border-r-gray-400"
                : " text-white"
                } p-1 px-3 w-full`}
            >
              {item?.text}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default RoundedDropDownSelectSM;
