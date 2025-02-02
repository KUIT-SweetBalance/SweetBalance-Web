import React, { useRef } from 'react';
import { BaseDrinkInfoProps } from '../../../types/drink';

const EditDrinkModal = (props: BaseDrinkInfoProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)]">
        <div className="text-[20px] space-y-[2px]">
          <p>{props.cafeName}</p>
          <p>
            <span className="text-[25px] font-[600] text-primary">
              {props.drinkName}
            </span>
            를 즐겨찾기에 추가하시겠어요?
          </p>
        </div>

        {/* <div className='text-[14px] text-[#909090] py-2 mt-2'>
            빠른 기록 시 음료 커스텀 적용은 불가능해요
        </div> */}

        <div className="flex mt-4 space-x-5">
          <button
            type="button"
            className="flex-1 text-center py-[10px] text-primary text-[17px] rounded-full border border-1-[#F4F4F4] whitespace-nowrap"
          >
            아니오
          </button>
          <button
            type="button"
            className="flex-1 text-center py-[10px] text-white bg-primary text-[187x] rounded-full whitespace-nowrap"
          >
            기록할래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDrinkModal;
