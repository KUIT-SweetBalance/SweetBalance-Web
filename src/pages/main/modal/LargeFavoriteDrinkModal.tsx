import React, { useState, useRef } from 'react';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';

interface LargeFavoriteDrinkModalProps {
  cafeName: string;
  drinkName: string;
  sugar: number;
  kcal: number;
  size: string;
  // onClose: () => void;
}

const LargeFavoriteDrinkModalProps = (props: LargeFavoriteDrinkModalProps) => {
  const { isOpen, closeModal } = useLargeFavoriteDrinkModalStore();

  if (!isOpen) return null;

  return (
    // fixed: 부모 요소나 다른 컨텍스트에 상관없이 뷰포트를 기준으로 위치가 고정
    // inset-0: top, right, bottom, left를 모두 0으로 설정하는 css속성, 즉 요소가 부모 전체를 꽉 채우도록 확장
    <div className="fixed inset-0 top-[-30px] bg-black bg-opacity-10 flex items-center justify-center z-1000">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)] space-y-[21px]">
        <div className="space-y-2 text-center">
          <p className="text-[18px]">
            <span>{props.cafeName}</span>&nbsp;
            <span className="font-[600]">{props.drinkName}</span>
            <span>&nbsp;이(가)</span>
          </p>
          <p className="text-[23px]">
            <span className="text-primary font-[700]">즐겨찾는 메뉴</span>
            <span className="font-[500]">로 기록됐어요!</span>
          </p>
        </div>

        <div className="w-[181px] h-[181px] bg-[#F4F4F4] rounded-full"></div>

        <div className="flex space-x-[56px] text-[16px] text-center">
          <span>당 {props.sugar}g</span>
          <span>{props.kcal}kcal</span>
          <span>{props.size}(size)</span>
        </div>

        <button
          className="w-full rounded-full bg-primary text-white text-center py-[14px]"
          type="button"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LargeFavoriteDrinkModalProps;
