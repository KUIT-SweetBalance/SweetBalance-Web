import React, { useState } from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import Header from '../../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import EditDrinkModal from '../modal/EditDrinkModal';
import NoContents from '../../../components/noContents/NoContents';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';
import useEditDrinkModalStore from '../../../store/modal/EditDrinkModal';
import { useQuery } from '@tanstack/react-query';
import {
  DrinkListTodayResponse,
  fetchDrinkListToday,
} from '../../../api/main/home2/Today/Home2TodayBody';

const EditDrink = () => {
  const { isOpen } = useEditDrinkModalStore();

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

  if (!drinkListTodayData?.data || drinkListTodayData.data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center mt-[30px]">
        <div className="flex w-[calc(100%-48px)]">
          <Header headerTitle="수정하기" />
        </div>

        <div className="flex flex-col justify-between w-[calc(100%-48px)] ml-[10px] mt-5 mb-3">
          <div className="text-[17px]">오늘 마신 음료수</div>
        </div>

        <div className='flex-grow flex mb-[70px]'>
          <NoContents contentString='아직 기록이 없습니다'/>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-[30px]">
      <div className="flex w-[calc(100%-48px)]">
        <Header headerTitle="수정하기" />
      </div>

      <div className="flex flex-col justify-between w-[calc(100%-48px)] ml-[10px] mt-5 mb-3">
        <div className="text-[17px]">오늘 마신 음료수</div>
        {/* <div className="text-[12px] text-gray_text mt-[6px]">
          하단 별 클릭 시 빠른 기록이 가능해요!
        </div> */}
        {/* <button type="button" className="text-[14px] text-[#909090]">
          수정하기
        </button> */}
      </div>

      {/* 음료 정보 */}
      <div className="flex flex-col w-full  mb-5">
        {drinkListTodayData?.data?.map((drink, index) => (
          <DrinkInfo
            key={index}
            imgUrl={drink.imgUrl}
            dateAndTime={drink.createdAt}
            isEditDeleteBtnExist={true}
            cafeNameMiddle={drink.brand}
            drinkName={drink.beverageName}
            sugar={drink.sugar}
            syrupType={drink.syrupName}
            syrup={drink.syrupCount}
            size={drink.sizeType}
          />
        ))}
      </div>

      {/* <BottomNavi /> */}
      {isOpen && <EditDrinkModal />}
    </div>
  );
};

export default EditDrink;
