import React from 'react';
import Header from '../../../components/header/Header'; 
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import {useMutation, useQueryClient,useInfiniteQuery } from "@tanstack/react-query";
import styled from 'styled-components';
import { useState } from 'react';
import Arrangement from '../mypage-record/Arrangement';
import DeleModal from '../mypage-record/Dele/Delemodal';
import {fetchScrapDrinks,DeleteScrapDrinks,InfiniteScrapDrinkData} from "../../../api/mypage/scrap/MypageScrap";
import MypageScrapInfo from './MypageScrapinfo';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

const Padding = styled.div`
padding: 25px;
`;
const HeaderPadding = styled.div`
  padding: 0 14px 0 21px;
`;
const NoDataMessage = styled.div`
  
  display: inline-flex;
padding: 214px 130px;
justify-content: center;
align-items: center;
gap: 10px;
color: var(--gray-text, #909090);
font-family: 'Pretendard';
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.35px;
`;

const MypageScrap: React.FC = () => {
  //삭제 모달
  const [deleteStates, setDeleteStates] = useState<{ [key: number]: boolean }>({});
  const openDeleteModal = (id: number) => {
    setDeleteStates((prev) => ({ ...prev, [id]: true }));
  };
  const closeDeleteModal = (id: number) => {
    setDeleteStates((prev) => ({ ...prev, [id]: false }));
  };
  
  //즐겨찾기 삭제
  const queryClient = useQueryClient();
  const deleteScrapMutation = useMutation({
    mutationFn: (favoriteId: number) => DeleteScrapDrinks(favoriteId),
    onSuccess: () => {
      // ✅ 삭제 후, 최신 데이터로 UI 업데이트
      queryClient.invalidateQueries({ queryKey: ['scrapDrinks'] });
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });
  const handleDelete = (favoriteId: number) => {
    deleteScrapMutation.mutate(favoriteId);
    closeDeleteModal(favoriteId); // 모달 닫기
  };


  const [searchTerm, setSearchTerm] = useState("");

  //검색 기능
  const {
      // watch, // 입력 필드 값 실시간 확인e
      getValues, // 입력값 가져오기
      register, // 유효성 검사와 값 관리에 사용
    } = useForm({
      mode: "onChange", // ✅ 입력값 변경 시 자동 반영
    }); // mode: onChange로 설정

    const handleSearchClick = () => {
      const inputValue = getValues('SearchDrink') || "";
      setSearchTerm(inputValue); // ✅ 검색어 상태 업데이트
      console.log("검색어:", inputValue);
    };
    


// 무한스크롤 useInfiniteQuery
const {
  data: drinkList, // 가져온 모든 페이지의 데이터 포함
  fetchNextPage, // 다음 페이지의 데이터를 가져오는 함수
  hasNextPage, // 다음 페이지가 존재하는지 여부를 나타내는 불리언 값
  isFetchingNextPage, // 다음 페이지 가져오는 중인지 여부 나타냄
} = useInfiniteQuery<
InfiniteScrapDrinkData,
  Error,
  InfiniteScrapDrinkData,
  number
>({
  // 각 페이지의 반환 타입
  // 에러 타입
  // 단일 페이지의 데이터 타입
  // PageParam의 타입
  queryKey: ["scrapDrinks"],
  queryFn: (
    { pageParam = 0 }: { pageParam: number }, // pageParam의 형식지정 number로 안하면 'unknown' 형식은 'number'형식에 할당할 수 없습니다 라는 오류 발생
  ) =>
    fetchScrapDrinks(
      pageParam,
    ),
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



const filteredDrinks = drinkList?.pages
    .flatMap((page) => page.data)
    .filter((drink) => searchTerm ? drink.name.toLowerCase().includes(searchTerm.toLowerCase()) : true) || [];

    return (
        <>
        <HeaderPadding>
        <Header headerTitle='나의 즐겨찾기 목록' confirmButton='완료' />
        </HeaderPadding>
        <Padding>
            <SearchInput 
            id='SearchDrink' 
            type='input' 
            placeholder='검색어로 빠르게 기록 찾기' 
            register={register}
            onSearch={handleSearchClick} />
        </Padding>
        <Arrangement title ='내가 즐겨찾기한 음료'/>
        {filteredDrinks.length === 0 ? (
        <NoDataMessage>아직 기록이 없습니다.</NoDataMessage>
      ) : (
        filteredDrinks
          .map((drinkItem)  => (
        <div key={drinkItem.favoriteId}>
          {/* 음료 리스트 */}
          <MypageScrapInfo 
            drink={drinkItem} 
            onClick={() => openDeleteModal(drinkItem.favoriteId)}  
          />

          {/* 삭제 확인 모달 */}
          {deleteStates[drinkItem.favoriteId] && (
            <DeleModal 
              onClick={() => closeDeleteModal(drinkItem.favoriteId)} 
              onClick1={() => handleDelete(drinkItem.favoriteId)} 
              drink={drinkItem.name}
              brand={drinkItem.brand}
            />
          )}
          {isFetchingNextPage && <div>Loading more drinks...</div>}
          <div ref={target}></div>
        </div>
        
      )
      ))}

        </>
    );
};

export default MypageScrap;