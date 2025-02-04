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

const EditDrink = () => {
  const { isOpen } = useEditDrinkModalStore();

  return (
    <div className="flex flex-col items-center mt-[30px]">
      <div className="flex w-[calc(100%-48px)]">
        <Header headerTitle="수정하기" />
      </div>

      <div className="flex flex-col justify-between w-[calc(100%-48px)] ml-[10px] my-5">
        <div className="text-[17px]">오늘 마신 음료수</div>
        <div className="text-[12px] text-gray_text mt-[6px]">
          하단 별 클릭 시 빠른 기록이 가능해요!
        </div>
        {/* <button type="button" className="text-[14px] text-[#909090]">
          수정하기
        </button> */}
      </div>

      {/* 음료 정보 */}
      <div className="flex flex-col w-full  mb-5">
        <DrinkInfo
          dateAndTime="2025.02.04 (화) 12:29"
          isEditDeleteBtnExist={true}
          cafeNameMiddle="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={1}
          syrupType="딸기 시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          dateAndTime="2025.02.04 (화) 12:29"
          isEditDeleteBtnExist={true}
          cafeNameMiddle="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={1}
          syrupType="딸기 시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          dateAndTime="2025.02.04 (화) 12:29"
          isEditDeleteBtnExist={true}
          cafeNameMiddle="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={1}
          syrupType="딸기 시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          dateAndTime="2025.02.04 (화) 12:29"
          isEditDeleteBtnExist={true}
          cafeNameMiddle="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={1}
          syrupType="딸기 시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          dateAndTime="2025.02.04 (화) 12:29"
          isEditDeleteBtnExist={true}
          cafeNameMiddle="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={1}
          syrupType="딸기 시럽"
          syrup={2}
          size="tall"
        />
      </div>

      {/* <BottomNavi /> */}
      {isOpen && <EditDrinkModal />}
    </div>
  );
};

export default EditDrink;
