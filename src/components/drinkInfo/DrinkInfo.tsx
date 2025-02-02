import React, { useState } from 'react';
import heart from '../../assets/heart.png';
import heartFilled from '../../assets/heart-filled.png';
import { BaseDrinkInfoProps } from '../../types/drink';

const DrinkInfo = (props: BaseDrinkInfoProps) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-between">
      <div className="w-[74px] h-[74px] bg-[#F4F4F4] rounded-full"></div>
      <div className={`flex flex-col`}>
        {/* mr-{} 적용 안될 때 있는데 코드 지웠다가 다시 작성하면 적용됨 */}
        <div className="text-xs mt-[2px]">{props.cafeName}</div>
        <div className="flex justify-between">
          <div className="text-[16px] font-medium mt-[4px]">
            {props.drinkName}
          </div>
          <button
            type="button"
            onClick={() => setSelected(!selected)}
            className="flex border w-[24px] h-[24px] bg-[#F4F4F4] rounded-full justify-center items-center"
          >
            <img
              src={selected ? heartFilled : heart}
              alt="저장"
              className="w-[14px] h-[13px]"
            />
          </button>
        </div>
        <div className="flex text-xs ml-[10px] space-x-10 mt-[10px]">
          <div>당 {props.sugar}g</div>
          <div>
            {props.syrupType}&nbsp;{props.syrup}
          </div>
          <div>{props.size}(size)</div>
        </div>
      </div>
    </div>
  );
};

export default DrinkInfo;
