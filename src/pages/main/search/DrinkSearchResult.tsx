import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import {
  DrinkListResponse,
  fetchDrinkList,
  InfiniteDrinkListResponse,
} from '../../../api/main/search/DrinkList';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';
import NoContents from '../../../components/noContents/NoContents';

const DrinkSearchResult = () => {
  const { cafeName, drinkName } = useParams();
  const placeholderText = `${cafeName} 내에서 제품명을 검색해주세요`;

  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    if (!inputValue) {
      return;
    }
    console.log(inputValue);
  };

  // 네비게이션
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  // 즐겨찾기 모달창
  const { isOpen } = useLargeFavoriteDrinkModalStore();

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
    queryKey: ['drinkList', drinkName, cafeName],
    queryFn: (
      { pageParam = 0 }: { pageParam: number }, // pageParam의 형식지정 number로 안하면 'unknown' 형식은 'number'형식에 할당할 수 없습니다 라는 오류 발생
    ) =>
      fetchDrinkList({
        page: pageParam,
        brandName: cafeName,
        keyword: drinkName,
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

  if (drinkList?.pages[0].data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center mt-[60px]">
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

        <p className="w-full my-[20px] pl-[24px] space-x-[6px]">
          {cafeName && (
            <span className="text-[18px] text-gray_text">
              {cafeName}&nbsp;내&nbsp;
            </span>
          )}
          <span className="text-[18px] font-[600]">'{drinkName}'&nbsp;</span>
          <span className="text-[18px] text-gray_text">검색 결과&nbsp;</span>
          <span className="text-[18px] text-primary">
            {/* {drinkList?.pages.data.length ?? 0} */}
          </span>
        </p>

        <div className="flex-grow flex mb-[70px]">
          <NoContents />
        </div>
      </div>
    );
  }

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
            placeholder={placeholderText}
            register={register}
            onSearch={handleSearchClick}
          />
        </div>
      </div>

      <p className="w-full my-[20px] pl-[24px] space-x-[6px]">
        {cafeName && (
          <span className="text-[18px] text-gray_text">
            {cafeName}&nbsp;내&nbsp;
          </span>
        )}
        <span className="text-[18px] font-[600]">'{drinkName}'&nbsp;</span>
        <span className="text-[18px] text-gray_text">검색 결과&nbsp;</span>
        <span className="text-[18px] text-primary">
          {/* {drinkList?.pages.data.length ?? 0} */}
        </span>
      </p>

      <div className="flex flex-col w-full  mb-5">
        {drinkList?.pages
          .map((page) => page.data) // 각 페이지의 data 배열 추출
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
        <div ref={target}></div>
      </div>

      {isOpen && <LargeFavoriteDrinkModal />}
    </div>
  );
};

export default DrinkSearchResult;
