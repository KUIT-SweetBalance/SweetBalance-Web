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
        <div className="w-[115px] h-[115px] rounded-full bg-[#F4F4F4]"></div>

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

      <div className='flex flex-col text-center space-y-1'>
        <p className='text-[12px] truncate'>{props.cafeName}</p>
        <p className='text-[20px] truncate'>{props.drinkName}</p>
      </div>

      <div className='flex text-center justify-between text-[12px] px-[15px]'>
        <span className=''>당 {props.sugar}g</span>
        <span className=''><span className='w-[80px] truncate'>{props.syrupType}</span>&nbsp;{props.syrup}</span>
        <span className=''>{props.size}</span>
      </div>
    </div>
  );
};

export default DrinkCard;
