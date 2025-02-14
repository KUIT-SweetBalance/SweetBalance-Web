import React, { useState } from 'react';
import { DrinkCardProps } from '../../../../types/drink';

const DrinkCard = (props: DrinkCardProps) => {
  const [selected, setSelected] = useState(false);
  const handleStarClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div className="px-[15px] py-[20px] w-[208px] h-[227px] flex-shrink-0 gap-[10px] flex flex-col border border-1-[#FFFFF] rounded-[20px]">
      <div className="flex ml-[31px] justify-between relative">
        <img
          src={props.imgUrl}
          alt="음료 이미지"
          className="w-[115px] h-[115px] rounded-full bg-[#F4F4F4]"
        ></img>

        {/* <button
          type="button"
          onClick={handleStarClick}
          className="absolute top-[6px] right-[6px]"
        >
          <img
            src={selected ? 'star-filled.png' : 'star.png'}
            alt="저장"
            className="w-[14px] h-[13px]"
          />
        </button> */}
      </div>

      <div className="flex flex-col text-center space-y-1">
        <p className="text-[12px] truncate">{props.cafeName}</p>
        <p className="text-[20px] truncate">{props.drinkName}</p>
      </div>

      <div className="flex justify-between text-center text-[12px] px-[7px] hitespace-nowrap">
        <span className="whitespace-nowrap">당 {props.sugar}g</span>
        {props.syrupType === null ? (
          <span className="w-[80px] truncate">시럽없음</span>
        ) : (
          <span className="w-[80px] truncate">
            &nbsp;{props.syrupType}&nbsp;{props.syrup}
          </span>
        )}
        <span className="whitespace-nowrap truncate">{props.size}</span>
      </div>
    </div>
  );
};

export default DrinkCard;
