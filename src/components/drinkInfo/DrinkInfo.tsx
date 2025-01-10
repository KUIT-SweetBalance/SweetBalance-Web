import React, { useState } from 'react';
import heart from '../../assets/heart.png';
import heartFilled from '../../assets/heart-filled.png';

const DrinkInfo = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-between p-2 mb-2">
      <div className="w-[74px] h-[74px] bg-[#F4F4F4] rounded-full"></div>
      <div className="flex w-[220px] flex-col">
        <div className="text-xs mt-[2px]">스타벅스</div>
        <div className="flex justify-between">
          <div className="text-[16px] font-medium mt-[4px]">아이스 아메리카노</div>
          <button
            type="button"
            onClick={() => setSelected(!selected)}
            className="flex border w-[24px] h-[24px] bg-[#F4F4F4] rounded-full justify-center items-center"
          >
            <img src={selected ? heartFilled : heart} alt="저장" className="w-[14px] h-[13px]" />
          </button>
        </div>
        <div className="flex text-xs ml-[10px] space-x-10 mt-[10px]">
          <div >당 0g</div>
          <div >0kcal</div>
          <div >tall(size)</div>
        </div>
      </div>
    </div>
  );
};

export default DrinkInfo;
