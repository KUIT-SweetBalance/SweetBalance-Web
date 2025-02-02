import React, { useState } from 'react';

interface DrinkCardProps {
    image?: string;
    isAdded?: boolean; // 즐겨찾기 추가 여부
    cafeName: string;
    drinkName: string;
    sugar: number;
    kcal: number;
    size: string;
}

const DrinkCard = (props: DrinkCardProps) => {
  const [selected, setSelected] = useState(false);
  const handleStarClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div className="px-[15px] py-[20px] w-[208px] h-[227px] flex-shrink-0 gap-[10px] flex flex-col border border-1-[#FFFFF] rounded-[20px]">
      <div className="flex ml-[31px] justify-between relative">
        <div className="w-[115px] h-[115px] rounded-full bg-[#F4F4F4]"></div>

        <button
          type="button"
          onClick={handleStarClick}
          className="absolute top-[6px] right-[6px]"
        >
          <img
            src={selected ? 'star-filled.png' : 'star.png'}
            alt="저장"
            className="w-[14px] h-[13px]"
          />
        </button>
      </div>

      <div className='flex flex-col text-center'>
        <p className='text-[12px] truncate'>{props.cafeName}</p>
        <p className='text-[20px] truncate'>{props.drinkName}</p>
      </div>

      <div className='flex text-center text-[12px]'>
        <span className='flex-1'>당 {props.sugar}g</span>
        <span className='flex-1'>{props.kcal}kcal</span>
        <span className='flex-1'>{props.size}</span>
      </div>
    </div>
  );
};

export default DrinkCard;
