import React, { useState, useRef } from 'react';

interface LargeFavoriteDrinkModalProps {
    cafeName: string;
    drinkName: string;
    sugar: number;
    kcal: number;
    size: string;
}

const LargeFavoriteDrinkModalProps = (props: LargeFavoriteDrinkModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)] space-y-[21px]">
        <div className='space-y-2 text-center'>
            <p className='text-[18px]'>
                <span>스타벅스</span>&nbsp;
                <span className='font-[600]'>아이스 아메리카노</span>
                <span>&nbsp;이(가)</span>
            </p>
            <p className='text-[23px]'>
                <span className='text-primary font-[700]'>즐겨찾는 메뉴</span>
                <span className='font-[500]'>로 기록됐어요!</span>
            </p>
        </div>

        <div className='w-[181px] h-[181px] bg-[#F4F4F4] rounded-full'></div>
      
        <div className='flex space-x-[56px] text-[16px] text-center'>
            <span>당 0g</span>
            <span>0kcal</span>
            <span>tall(size)</span>
        </div>

        <button className='w-full rounded-full bg-primary text-white text-center py-[14px]' type="button">
            확인
        </button>
      </div>
    </div>
  );
};

export default LargeFavoriteDrinkModalProps;
