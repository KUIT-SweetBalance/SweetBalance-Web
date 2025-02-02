import React from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from './DrinkCard';

const Home2TodayBody = () => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/edit');
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between pt-[20px] px-[34px] pb-[10px]">
        <div className="flex flex-col text-start space-y-[5px]">
          <p className="text-[18px]">오늘 마신 음료수</p>
          <p className="text-gray_text text-[12px]">
            별 클릭 시 빠른 기록이 가능해요!
          </p>
        </div>

        <div>
          <button
            type="button"
            className="text-[14px] text-gray_text pt-[6px]"
            onClick={handleEditClick}
          >
            수정하기
          </button>
        </div>
      </div>

      <div className="flex py-[10px] px-[24px] gap-[10px] overflow-x-auto scrollbar-hide">
        <DrinkCard
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={100}
          kcal={700}
          size="tall(size)"
        />
        <DrinkCard
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={100}
          kcal={700}
          size="tall(size)"
        />
        <DrinkCard
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={100}
          kcal={700}
          size="tall(size)"
        />
      </div>
    </div>
  );
};

export default Home2TodayBody;
