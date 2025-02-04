import React from 'react';
import { useForm } from 'react-hook-form';
import AppTitle from '../../../components/appTitle/AppTitle';
import SearchInput from '../../../components/input/searchInput/SearchInput';

const AllBrands = () => {
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

  // 임시 데이터
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
    <div className="flex flex-col items-center w-full mt-[60px]">
      {/* <AppTitle leftButton={true} /> */}

      <div className="flex w-[calc(100%-48px)] mb-[40px]">
        <SearchInput
          id="SearchDrink"
          type="text"
          placeholder="브랜드명이나 제품명을 검색해주세요."
          register={register}
          onSearch={handleSearchClick}
        />
      </div>

      <div className="flex w-[calc(100%-48px)] space-x-[6px] mb-[28px] items-baseline">
        <span className="font-medium text-[18px]">브랜드 전체</span>
        <span className="font-[500] text-[18px] text-primary">
          {brands.length}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-y-4 w-[calc(100%-48px)]">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-3 text-center"
          >
            <div className="w-[90px] h-[90px] rounded-full border border-[#E5E5E5]"></div>
            <div className="text-[12px] text-[#909090]">{brand}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBrands;
