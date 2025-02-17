import React, { useState, useEffect } from 'react';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import { useLocation } from 'react-router-dom';
import {
  Beverage,
  BeverageResponse,
  fetchPopularDrinks,
} from '../../../api/main/search/BrandSearchResult/BrandSearchResult';
import {
  DrinkListResponse,
  fetchDrinkList,
  InfiniteDrinkListResponse,
} from '../../../api/main/search/DrinkList';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';

const BrandSearchResult = () => {
  // input필드 설정
  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  // SearchDrink로부터 데이터 받기
  const location = useLocation();
  const { cafeName, imgSrc } = location.state || {};
  const placeholderText = `${cafeName} 내에서 제품명을 검색해주세요`;

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    if (!inputValue) {
      return;
    }
    navigate(
      `/drink-result/${encodeURIComponent(cafeName)}/${encodeURIComponent(inputValue)}`,
    );
    console.log(inputValue);
  };

  // 네비게이션
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

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

  // 음료 카테고리 클릭
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };

  // 즐겨찾기 모달창
  const { isOpen } = useLargeFavoriteDrinkModalStore();

  // 현재 날짜 정보 저장('사람들이 많이 마신 음료' 컴포넌트에 사용)
  const [currentDate, setCurrentDate] = useState<string>('');
  useEffect(() => {
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/[^0-9.]/g, '') // 불필요한 문자 제거
      .replace(/\.$/, ''); // 연.월.일. <- 일 뒤에 붙는 . 제거
    setCurrentDate(formattedDate);
  }, []);

  // 인기 음료 데이터 호출(useQuery)
  const {
    data: popularDrinks,
    isLoading,
    isError,
    error,
  } = useQuery<BeverageResponse, Error>({
    queryKey: ['popularDrinks', cafeName],
    queryFn: () => fetchPopularDrinks(cafeName),
  });

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
    queryKey: ['drinkList', cafeName, selectedCategory, selectedFilter],
    queryFn: (
      { pageParam = 0 }: { pageParam: number }, // pageParam의 형식지정 number로 안하면 'unknown' 형식은 'number'형식에 할당할 수 없습니다 라는 오류 발생
    ) =>
      fetchDrinkList({
        page: pageParam,
        brandName: cafeName,
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

  const drinkCategory = ['전체', '커피', '음료', '시그니처', '기타'];

  return (
    <div className="flex flex-col items-center mt-[30px] w-full">
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
            placeholder={placeholderText}
            register={register}
            onSearch={handleSearchClick}
          />
        </div>
      </div>

      <div className="w-full flex justify-between justify-center items-center">
        <div className="flex items-center space-x-5 my-[20px] ml-[26px]">
          <img
            src={imgSrc}
            alt="카페 로고"
            className="w-[79px] h-[79px] rounded-full bg-[#F4F4F4]"
          />
          <span className="font-[500] text-[19px]">{cafeName}</span>
        </div>
        {/* <div className="flex space-x-2 bg-[#F4F4F4] items-center rounded-full px-3 py-[6px]">
          <img src="/star.png" alt="즐겨찾기" className="w-[14px] h-[14px]" />
          <span className="text-[12px]">즐겨찾기</span>
        </div> */}
      </div>

      <div className="w-full h-[10px] mb-[20px] bg-[#F4F4F4]"></div>

      <div className="w-[calc(100%-48px)] flex justify-between mt-5 mb-6 items-center">
        <span className="font-[500] text-[17px]">사람들이 많이 마신 음료</span>
        <span className="text-[13px] text-[#B6B6B6]">
          {currentDate}&nbsp;기준
        </span>
      </div>

      <div className="flex w-[calc(100%-48px)]">
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error?.message || 'Failed to load data'}</div>}
        {popularDrinks?.data.map((drink, index) => (
          <div
            key={index}
            className="flex flex-col flex-1 items-center text-center"
          >
            <div className="text-[13px] mb-[8px]">{index + 1}위</div>
            <img
              src={drink.imgUrl}
              alt="인기 음료 이미지"
              className="w-[90px] h-[90px] rounded-full border border-[#E5E5E5] mb-[11px]"
            />
            <div className="text-[12px] text-[#909090]">{drink.name}</div>
          </div>
        ))}
      </div>

      <div className="w-full h-[10px] mt-10 mb-[30px] bg-[#F4F4F4]"></div>

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
              drinkData={drinkItem}
              drinkName={drinkItem.name}
              imgUrl={drinkItem.imgUrl}
              isFavoriteBtnExist={true}
              cafeNameTop={drinkItem.brand}
              sugar={drinkItem.sugarPer100ml}
            />
          ))}
        <div ref={target}></div>
      </div>

      {isOpen && <LargeFavoriteDrinkModal />}
    </div>
  );
};

export default BrandSearchResult;
