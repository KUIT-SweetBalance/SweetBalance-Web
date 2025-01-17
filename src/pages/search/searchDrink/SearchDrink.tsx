import AppTitle from '../../../components/appTitle/AppTitle';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const SearchDrink = () => {
  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  const [clickedCategory, setClickedCategory] = useState<number>(0);

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    console.log(inputValue);
  };

  const handleCategoryClick = (index: number) => {
    setClickedCategory(index);
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

  const drinkCategory = [
    '전체',
    '아메리카노',
    '콜드브루',
    '라떼',
    '에스프레소',
    '말차',
    '딸기',
    '초코',
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <AppTitle />

      <div className="flex w-[calc(100%-48px)] mb-[40px]">
        <SearchInput
          id="SearchDrink"
          type="text"
          placeholder="브랜드명이나 제품명을 검색해주세요."
          register={register}
          onSearch={handleSearchClick}
        />
      </div>

      <div className="flex w-[calc(100%-48px)] justify-between mb-[18px] items-baseline">
        <div className="font-medium text-[18px]">브랜드</div>
        <button type="button" className="text-[14px] text-primary">
          더보기
        </button>
      </div>

      <div className="flex w-[calc(100%-48px)] mb-[34px] space-x-5 overflow-x-auto scrollbar-hide">
        {/* scrollbar-hide를 사용하려면 tailwind-scrollbar-hide 설치하고 config파일에 플러그인 추가해야 함 */}
        {brands.map((brand, index) => (
          <button
            type="button"
            key={index}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-[60px] h-[60px] rounded-full border"></div>
            <div className="text-[12px] text-[#000000] text-center whitespace-nowrap">
              {brand}
            </div>
          </button>
        ))}
      </div>

      <div className="w-full h-[15px] mb-[30px] bg-[#F4F4F4]"></div>

      <div className="flex w-[calc(100%-48px)] justify-between mb-[18px] items-baseline">
        <div className="font-medium text-[18px]">음료 카테고리</div>
        <button type="button" className="text-[14px] text-primary">
          당 함량 높은 순
        </button>
      </div>

      <div className="relative w-[calc(100%-48px)] overflow-x-auto scrollbar-hide">
        <div className="relative z-10 flex space-x-[32px]">
          {drinkCategory.map((category, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleCategoryClick(index)}
              className={`text-center text-[14px] w-auto pb-[7px] whitespace-nowrap ${
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
        <div
          className="absolute z-0 h-[3px] bg-[#F4F4F4] bottom-0"
          style={{
            width: `max(100%, ${drinkCategory.length * 70}px)`,
          }}
        ></div>
      </div>

      <div className="flex flex-col w-[calc(100%-70px)] mt-[22px] space-y-6 mb-5">
        <DrinkInfo
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={0}
          kcal={0}
          size="tall"
          marginRight="4"
        />
        <DrinkInfo
          cafeName="더벤티"
          drinkName="카페라떼"
          sugar={0}
          kcal={0}
          size="tall"
          marginRight="4"
        />
        <DrinkInfo
          cafeName="스타벅스"
          drinkName="자몽 허니 블랙 티"
          sugar={0}
          kcal={0}
          size="tall"
          marginRight="4"
        />
        <DrinkInfo
          cafeName="빽다방"
          drinkName="딸기 스무디"
          sugar={0}
          kcal={0}
          size="tall"
          marginRight="4"
        />
      </div>
    </div>
  );
};

export default SearchDrink;
