import React, { useState } from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import star from '../../../assets/star.png';
import starFilled from '../../../assets/star-filled.png';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import { spawn } from 'child_process';

const BrandSearchResult = () => {
  // input필드 설정
  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    navigate(`/drink-result/${encodeURIComponent('스타벅스')}/${encodeURIComponent(inputValue)}`)
    console.log(inputValue);
  };

  // 네비게이션
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  // 검색결과 필터링
  const [selectedFilter, setSelectedFilter] = useState<
    'ascending' | 'descending'
  >('ascending');
  const handleFilterClick = (selected: 'ascending' | 'descending') => {
    if (selected === 'ascending') {
      setSelectedFilter('descending');
    } else {
      setSelectedFilter('ascending');
    }
  };

  // 음료 카테고리 클릭
  const [clickedCategory, setClickedCategory] = useState<number>(0);
  const handleCategoryClick = (index: number) => {
    setClickedCategory(index);
  };

  // 임시 데이터
  const brands = [
    '스타벅스',
    '바닐라 크림 콜드 브루',
    '투썸플레이스',
    '이디야',
    '커피빈',
    '빽다방',
    '메가커피',
    '더벤티',
  ];

  const drinkCategory = ['전체', '커피', '음료', '시그니처', '기타'];

  return (
    <div className="flex flex-col items-center mt-[60px] w-full">
      {/* <AppTitle leftButton={true} /> */}

      <div className="flex justify-center w-full pb-[10px] px-[23px]">
        <button type="button" className="mr-[20px]">
          <img
            src="/chevron-left-primary.png"
            alt="뒤로가기"
            className="w-[8px] h-[14px]"
            onClick={handleBackClick}
          />
        </button>

        <div className="flex w-full">
          <SearchInput
            id="SearchDrink"
            type="text"
            placeholder="제품명을 검색해주세요."
            register={register}
            onSearch={handleSearchClick}
          />
        </div>
      </div>

      <div className="w-full flex justify-between justify-center items-center">
        <div className="flex items-center space-x-5 my-[20px] ml-[26px]">
          <div className="w-[79px] h-[79px] rounded-full bg-[#F4F4F4]"></div>
          <span className="font-[500] text-[19px]">스타벅스</span>
        </div>
        {/* <div className="flex space-x-2 bg-[#F4F4F4] items-center rounded-full px-3 py-[6px]">
          <img src="/star.png" alt="즐겨찾기" className="w-[14px] h-[14px]" />
          <span className="text-[12px]">즐겨찾기</span>
        </div> */}
      </div>

      <div className="w-full h-[10px] mb-[20px] bg-[#F4F4F4]"></div>

      <div className="w-[calc(100%-48px)] flex justify-between mt-5 mb-6 items-center">
        <span className="font-[500] text-[17px]">사람들이 많이 마신 음료</span>
        <span className="text-[13px] text-[#B6B6B6]">24.10.16 기준</span>
      </div>

      <div className="flex w-[calc(100%-48px)] space-x-5 overflow-x-auto scrollbar-hide">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-[13px] mb-[8px]">{index + 1}위</div>
            <div className="w-[90px] h-[90px] rounded-full border border-[#E5E5E5] mb-[11px]"></div>
            <div className="text-[12px] text-[#909090]">{brand}</div>
          </div>
        ))}
      </div>

      <div className="w-full h-[10px] mt-10 bg-[#F4F4F4]"></div>

      <div className="flex flex-col w-[calc(100%-48px)] mt-7 mb-[18px]">
        <div className="flex justify-between items-baseline">
          <div className="space-x-[10px]">
            <span className="font-[500] text-[18px]">검색결과</span>
            <span className="text-[14px] text-gray_text">{122}건</span>
          </div>

          <button
            type="button"
            className="flex text-[14px] text-primary space-x-[6px]"
            onClick={() => handleFilterClick(selectedFilter)}
          >
            <span>
              {selectedFilter === 'ascending'
                ? '당 함량 높은 순'
                : '당 함량 낮은 순'}
            </span>
            <img
              src="/updown.png"
              alt="정렬기준"
              className={`w-[15.6px] h-[14px] transition-transform duration-300 ${
                selectedFilter === 'ascending' ? '' : 'scale-y-[-1]'
              }`}
            />
          </button>
        </div>
        <span className="text-[12px] text-gray_text mt-[6px]">
          '100ml 기준' 당 함량 정보 제공 필요
        </span>
      </div>

      <div className="relative w-[calc(100%-48px)] overflow-x-auto scrollbar-hide mt-[15px]">
        <div className="relative z-10 flex space-x-[32px] justify-between">
          {drinkCategory.map((category, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleCategoryClick(index)}
              className={`text-center text-[14px] px-[4px] w-auto pb-[7px] whitespace-nowrap ${
                clickedCategory === index
                  ? 'text-primary font-medium border-b-[3px] border-primary'
                  : 'text-[#B5B5B5] font-normal border-b-[3px] border-transparent'
              }`}
              // whitespace-nowrap: 텍스트가 width를 초과했을 때 자동으로 줄바꿈을 하고싶지 않은 경우 적용
            >
              {category}
            </button>
          ))}
        </div>
        {/* <div className='absolute z-0 w-full h-[3px] bg-[#F4F4F4] bottom-0'></div> */}
        <div className="absolute w-full z-0 h-[3px] bg-[#F4F4F4] bottom-0"></div>
      </div>

      <div className="flex flex-col w-full mt-[10px] mb-5">
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
      </div>
    </div>
  );
};

export default BrandSearchResult;
