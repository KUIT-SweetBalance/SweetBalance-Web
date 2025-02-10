import React from 'react';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';

const LargeFavoriteDrinkModal = () => {
  const {
    isOpen,
    closeModal,
    cafeName,
    drinkName,
    imgUrl,
    sugar,
    syrupType,
    syrup,
    size,
  } = useLargeFavoriteDrinkModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[-30px] bg-black bg-opacity-10 flex items-center justify-center z-1000">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)] space-y-[21px]">
        <div className="space-y-2 text-center">
          <p className="text-[18px]">
            <span>{cafeName}</span>&nbsp;
            <span className="font-[600]">{drinkName}</span>
            <span>&nbsp;이(가)</span>
          </p>
          <p className="text-[23px]">
            <span className="text-primary font-[700]">즐겨찾는 메뉴</span>
            <span className="font-[500]">로 기록됐어요!</span>
          </p>
        </div>

        <img src={imgUrl} alt="음료사진" className="w-[181px] h-[181px] bg-[#F4F4F4] rounded-full" />

        <div className="flex space-x-[56px] text-[16px] text-center">
          <span>당 {sugar}g</span>
          {/* <span>
            {syrupType}&nbsp;{syrup}
          </span>
          <span>{size}</span> */}
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

export default LargeFavoriteDrinkModal;
