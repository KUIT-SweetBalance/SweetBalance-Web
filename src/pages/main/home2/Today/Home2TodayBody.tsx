import React from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from './DrinkCard';
import { useQuery } from '@tanstack/react-query';
import {
  DrinkListToday,
  DrinkListTodayResponse,
  fetchDrinkListToday,
} from '../../../../api/main/home2/Today/Home2TodayBody';
import NoContents from '../../../../components/noContents/NoContents';

const Home2TodayBody = () => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/edit');
  };

  const {
    data: drinkListTodayData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DrinkListTodayResponse, Error>({
    queryKey: ['drinkListTodayResponse'],
    queryFn: fetchDrinkListToday,
  });

  return (
    <div className="w-full flex flex-col mb-[100px]">
      <div className="flex justify-between items-baseline pt-[20px] px-[34px] pb-[10px]">
        <div className="flex flex-col text-start space-y-[5px]">
          <p className="text-[18px]">오늘 마신 음료수</p>
          {/* <p className="text-gray_text text-[12px]">
            별 클릭 시 빠른 기록이 가능해요!
          </p> */}
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

      <div className="flex h-full py-[10px] px-[24px] gap-[10px] overflow-x-auto scrollbar-hide">
        {drinkListTodayData?.data?.length === 0 ? (
          <NoContents />
        ) : (
          drinkListTodayData?.data?.map((drink, index) => (
            <DrinkCard
              key={index}
              cafeName={drink.brand}
              imgUrl={drink.imgUrl}
              drinkName={drink.beverageName}
              sugar={drink.sugar}
              syrupType={drink.syrupName}
              syrup={drink.syrupCount}
              size={drink.sizeType}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home2TodayBody;
