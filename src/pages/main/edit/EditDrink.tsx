import React, { useState } from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import NavigateHeader from '../../../components/header/NavigateHeader';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import EditDrinkModal from './EditDrinkModal';

const EditDrink = () => {
  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    console.log(inputValue);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const brands = [
    '스타벅스',
    '할리스',
    '투썸플레이스',
    '이디야',
    '커피빈',
    '빽다방',
    '메가커피',
    '더벤티',
  ];

  return (
    <div className="flex flex-col items-center">
      <AppTitle />

      <div className="w-[calc(100%-48px)] mb-[16px]">
        <NavigateHeader headerTitle="알림 페이지" confirmButton="완료" />
      </div>

      <div className="flex w-[calc(100%-48px)] mb-[30px]">
        <SearchInput
          id="SearchDrink"
          type="text"
          placeholder="브랜드명이나 제품명을 검색해주세요."
          register={register}
          onSearch={handleSearchClick}
        />
      </div>

      <div className="flex  w-[calc(100%-48px)] justify-between mb-[30px]">
        <div className="text-[18px] font-medium">오늘 마신 브랜드</div>
        <button type="button" className="text-[14px] text-primary">
          삭제하기
        </button>
      </div>

      <div className="flex w-[calc(100%-48px)] space-x-5 overflow-x-auto scrollbar-hide">
        {/* scrollbar-hide를 사용하려면 tailwind-scrollbar-hide 설치하고 config파일에 플러그인 추가해야 함 */}
        {brands.map((brand, index) => (
          <button
            type="button"
            key={index}
            className="flex flex-col items-center space-y-[14px]"
          >
            <div className="w-[98px] h-[98px] rounded-full border"></div>
            <div className="text-[14px] text-[#909090] text-center whitespace-nowrap">
              {brand}
            </div>
          </button>
        ))}
      </div>

      <div className="w-full h-[15px] my-[30px] bg-[#F4F4F4]"></div>

      <div className="flex justify-between w-[calc(100%-48px)] mb-5">
        <div className="text-[18px]">오늘 마신 음료수</div>
        <button type="button" className="text-[14px] text-[#909090]">
          수정하기
        </button>
      </div>

      {/* 음료 정보 */}
      <div className="flex flex-col w-[calc(100%-50px)]">
        <DrinkInfo
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={0}
          kcal={0}
          size="tall"
        />
        <DrinkInfo
          cafeName="더벤티"
          drinkName="카페라떼"
          sugar={0}
          kcal={0}
          size="tall"
        />
        <DrinkInfo
          cafeName="스타벅스"
          drinkName="자몽 허니 블랙 티"
          sugar={0}
          kcal={0}
          size="tall"
        />
        <DrinkInfo
          cafeName="빽다방"
          drinkName="딸기 스무디"
          sugar={0}
          kcal={0}
          size="tall"
        />
      </div>
    </div>
  );
};

export default EditDrink;
