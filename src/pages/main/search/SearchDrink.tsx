import AppTitle from '../../../components/appTitle/AppTitle';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';

const SearchDrink = () => {
  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/all-brands');
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

  const handleBrandClick = () => {
    navigate('/brand-result');
  };

  const [clickedCategory, setClickedCategory] = useState<number>(0);

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    if (!inputValue) {
      alert('검색어를 입력해주세요!');
      return;
    }
    console.log(inputValue);
    navigate(`/drink-result/${encodeURIComponent(inputValue)}`);
  };

  const handleCategoryClick = (index: number) => {
    setClickedCategory(index);
  };

  const { isOpen } = useLargeFavoriteDrinkModalStore();

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

  const drinkCategory = ['전체', '커피', '음료', '시그니처', '기타'];

  return (
    <div className="flex flex-col items-center w-full mt-[60px] mb-[100px]">
      {/* <AppTitle /> */}

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
        {/* <button
          type="button"
          className="text-[14px] text-primary"
          onClick={handleEditClick}
        >
          더보기
        </button> */}
      </div>

      <div className="flex w-[calc(100%-48px)] mb-[34px] space-x-5 overflow-x-auto scrollbar-hide">
        {/* scrollbar-hide를 사용하려면 tailwind-scrollbar-hide 설치하고 config파일에 플러그인 추가해야 함 */}
        {brands.map((brand, index) => (
          <button
            type="button"
            key={index}
            className="flex flex-col items-center space-y-2"
            onClick={handleBrandClick}
          >
            <div className="w-[60px] h-[60px] rounded-full border"></div>
            <div className="text-[12px] text-[#000000] text-center whitespace-nowrap">
              {brand}
            </div>
          </button>
        ))}
      </div>

      <div className="w-full h-[15px] mb-[30px] bg-[#F4F4F4]"></div>

      <div className="flex flex-col w-[calc(100%-48px)] mt-[10px] mb-[18px]">
        <div className="flex justify-between items-baseline">
          <div className="font-medium text-[18px]">음료 카테고리</div>
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

      <div className="w-[calc(100%-48px)] overflow-x-auto scrollbar-hide mt-[15px]">
        <div className="flex space-x-[32px] justify-between border-b-[3px] ">
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
        {/* <div className="w-full h-[3px] bg-[#F4F4F4] bottom-0"></div> */}
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

      <BottomNavi />

      {/* 모달을 조건부 렌더링 */}
      {isOpen && <LargeFavoriteDrinkModal />}
    </div>
  );
};

export default SearchDrink;
