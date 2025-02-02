// 수정|수정하기, 수정|삭제하기 화면 모달창

import React, { useRef } from 'react';
import { BaseDrinkInfoProps } from '../../../types/drink';

interface EditDrinkModalProps {
  cafeName: string;
  drinkName: string;
  content: string;
  button1: string;
  button2: string;
  editCompleted?: string;
}

const EditDrinkModal = (props: EditDrinkModalProps) => {
  if (props.editCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-[calc(100%-48px)]">
          <p className="text-[20px] text-center my-[25px] mx-[20px]">{props.editCompleted}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)]">
        <div className="text-[20px] space-y-[2px]">
          <p>{props.cafeName}</p>
          <p>
            <span className="text-[25px] font-[600] text-primary">
              {props.drinkName}
            </span>
            {props.content}
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
            {props.button1}
          </button>
          <button
            type="button"
            className="flex-1 text-center py-[10px] text-white bg-primary text-[187x] rounded-full whitespace-nowrap"
          >
            {props.button2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDrinkModal;
