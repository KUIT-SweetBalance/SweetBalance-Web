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
  InfiniteDrinkListResponse,
} from '../../../api/main/search/DrinkList';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

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
  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    if (!inputValue) {
      return;
    }
    console.log(inputValue);
    navigate(`/drink-result/${encodeURIComponent(inputValue)}`);
  };

  const { isOpen } = useLargeFavoriteDrinkModalStore();

  const drinkCategory = ['전체', '커피', '음료', '시그니쳐', '기타'];

  // 무한스크롤 useInfiniteQuery
  const {
    data: drinkList, // 가져온 모든 페이지의 데이터 포함
    fetchNextPage, // 다음 페이지의 데이터를 가져오는 함수
    hasNextPage, // 다음 페이지가 존재하는지 여부를 나타내는 불리언 값
    isFetchingNextPage, // 다음 페이지 가져오는 중인지 여부 나타냄
  } = useInfiniteQuery<
    InfiniteDrinkListResponse,
    Error,
    InfiniteDrinkListResponse,
    number
  >({
    // 각 페이지의 반환 타입
    // 에러 타입
    // 단일 페이지의 데이터 타입
    // PageParam의 타입
    queryKey: ['drinkList', selectedCategory, selectedFilter],
    queryFn: (
      { pageParam = 0 }: { pageParam: number }, // pageParam의 형식지정 number로 안하면 'unknown' 형식은 'number'형식에 할당할 수 없습니다 라는 오류 발생
    ) =>
      fetchDrinkList({
        page: pageParam,
        sort: selectedFilter,
        category: drinkCategory[selectedCategory],
      }),
    getNextPageParam: (lastPage, allPages): number | false => {
      return allPages.length; // 다음 페이지 번호를 현재 페이지 수로 반환 -> queryFn의 pageParam에 반환됨
    },
    initialPageParam: 0,
  });

  // Intersection Observer 연결
  const target = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="flex flex-col items-center w-full mt-[30px] mb-[100px]">
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
          <div className="flex items-baseline">
            <div className="font-medium text-[18px]">음료 카테고리</div>
            <span className="ml-[6px] text-[14px] text-primary">
              {drinkList?.pages[0].data.totalBeverageNum ?? 0}개
            </span>
          </div>
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
        <div className="relative">
          <div className="absolute w-full h-[3px] bg-[#F4F4F4] bottom-[0px]"></div>

          <div className="flex space-x-[32px] justify-between relative pb-[7px]">
            {drinkCategory.map((category, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleCategoryClick(index)}
                className={`text-center text-[14px] px-[4px] w-auto pb-[7px] whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === index
                    ? 'text-primary font-[600] relative'
                    : 'text-[#B5B5B5] font-[400]'
                }`}
              >
                {category}

                {/* Primary 색상의 border */}
                {selectedCategory === index && (
                  <div className="absolute w-full h-[3px] bg-primary bottom-[-7px] left-0"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-[10px] mb-5">
        {drinkList?.pages
          .map((page) => page.data.beverages) // 각 페이지의 data 배열 추출
          .flat()
          .map((drinkItem) => (
            <DrinkInfo
              key={drinkItem.beverageId}
              drinkName={drinkItem.name}
              imgUrl={drinkItem.imgUrl}
              isFavoriteBtnExist={true}
              cafeNameTop={drinkItem.brand}
              sugar={drinkItem.sugarPer100ml}
            />
          ))}
        {isFetchingNextPage && <div>Loading more drinks...</div>}
        <div ref={target}></div>
      </div>

      <BottomNavi />

      {/* 모달을 조건부 렌더링 */}
      {isOpen && <LargeFavoriteDrinkModal />}
    </div>
  );
};

export default SearchDrink;
