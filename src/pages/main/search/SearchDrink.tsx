import AppTitle from '../../../components/appTitle/AppTitle';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';
import { brands } from '../../../types/brands';
import {
  DrinkListResponse,
  fetchDrinkList,
} from '../../../api/main/search/DrinkList';
import { useQuery } from '@tanstack/react-query';

const SearchDrink = () => {
  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  const navigate = useNavigate();

  // 검색결과 필터링
  const [selectedFilter, setSelectedFilter] = useState<
    'sugarAsc' | 'sugarDesc'
  >('sugarDesc');
  const handleFilterClick = (selected: 'sugarAsc' | 'sugarDesc') => {
    if (selected === 'sugarAsc') {
      setSelectedFilter('sugarDesc');
    } else {
      setSelectedFilter('sugarAsc');
    }
  };

  const handleBrandClick = (cafeName: string, imgSrc: string) => {
    navigate('/brand-result', { state: { cafeName, imgSrc } });
  };

  const [selectedCategory, setSelectedCategory] = useState<number>(0);

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
    setSelectedCategory(index);
  };

  const { isOpen } = useLargeFavoriteDrinkModalStore();

  const drinkCategory = ['전체', '커피', '음료', '시그니쳐', '기타'];

  // page, size
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  // 음료 데이터 get 요청
  const {
    data: drinkList,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DrinkListResponse, Error>({
    queryKey: ['popularDrinks', page, size, selectedFilter, selectedCategory], // cafeName이 바뀌면 다시 요청 보냄(여기서는 필요 없을 듯?)
    queryFn: () =>
      fetchDrinkList({
        page: page,
        size: size,
        sort: selectedFilter,
        category: drinkCategory[selectedCategory],
      }),
    // keepPreviousData: true, // 이전 데이터를 유지하여 부드러운 페이지 전환
  });

  return (
    <div className="flex flex-col items-center w-full mt-[60px] mb-[100px]">
      {/* <AppTitle /> */}

      <div className="flex w-[calc(100%-48px)] mb-[40px]">
        <SearchInput
          id="SearchDrink"
          type="text"
          placeholder="제품명을 검색해주세요"
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
        {brands.map(([cafeName, imgSrc], index) => (
          <button
            type="button"
            key={index}
            className="flex flex-col items-center space-y-2"
            onClick={() => handleBrandClick(cafeName, imgSrc)}
          >
            <img
              src={imgSrc}
              alt="브랜드 로고 이미지"
              className="w-[60px] h-[60px] rounded-full border"
            />
            <div className="text-[12px] text-[#000000] text-center whitespace-nowrap">
              {cafeName}
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
              {selectedFilter === 'sugarAsc'
                ? '당 함량 낮은 순'
                : '당 함량 높은 순'}
            </span>
            <img
              src="/updown.png"
              alt="정렬기준"
              className={`w-[15.6px] h-[14px] transition-transform duration-300 ${
                selectedFilter === 'sugarDesc' ? '' : 'scale-y-[-1]'
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
                selectedCategory === index
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
        {drinkList?.data.map((drinkItem, index) => (
          <DrinkInfo
            key={index}
            drinkName={drinkItem.name}
            imgUrl={drinkItem.imgUrl}
            isFavoriteBtnExist={true}
            cafeNameTop={drinkItem.brand}
            sugar={drinkItem.sugarPer100ml}
          />
        ))}
      </div>

      <BottomNavi />

      {/* 모달을 조건부 렌더링 */}
      {isOpen && <LargeFavoriteDrinkModal />}
    </div>
  );
};

export default SearchDrink;
