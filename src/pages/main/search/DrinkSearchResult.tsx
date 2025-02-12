import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import {
  DrinkListResponse,
  fetchDrinkList,
} from '../../../api/main/search/DrinkList';
import { useQuery } from '@tanstack/react-query';

const DrinkSearchResult = () => {
  const { cafeName, drinkName } = useParams();

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

  // 네비게이션
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

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
    queryKey: ['drinkList', page, size, drinkName], // cafeName이 바뀌면 다시 요청 보냄(여기서는 필요 없을 듯?)
    queryFn: () =>
      fetchDrinkList({
        page: page,
        keyword: drinkName,
      }),
    // keepPreviousData: true, // 이전 데이터를 유지하여 부드러운 페이지 전환
  });

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

      <p className="w-full my-[20px] pl-[24px] space-x-[6px]">
        {cafeName && (
          <span className="text-[18px] text-gray_text">
            {cafeName}&nbsp;내&nbsp;
          </span>
        )}
        <span className="text-[18px] font-[600]">'{drinkName}'&nbsp;</span>
        <span className="text-[18px] text-gray_text">검색 결과&nbsp;</span>
        <span className="text-[18px] text-primary">{drinkList?.data.length ?? 0}</span>
      </p>

      { }

      <div className="flex flex-col w-full  mb-5">
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
    </div>
  );
};

export default DrinkSearchResult;
