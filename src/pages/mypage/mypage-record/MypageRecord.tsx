import React, { useState } from "react";
import {useMutation, useQueryClient, useInfiniteQuery  } from "@tanstack/react-query";
import { useForm} from "react-hook-form";
import styled from "styled-components";
import { InfiniteRecordDrinkData } from "../../../api/mypage/record/MypageRecord";
import Header from "../../../components/header/Header";
import SearchInput from "../../../components/input/searchInput/SearchInput";
import MypageDrinkInfo from "./MypageDrinkInfo";
import Arrangement from "./Arrangement";
import EditModal from "./Edit/Editmodel";
import DeleModal from "./Dele/Delemodal";
import Deleted from "./Dele/Deleted";
import { fetchRecoringDrinks,DeleteRecordingDrinks } from "../../../api/mypage/record/MypageRecord";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

const Padding = styled.div`
  padding: 25px;
`;
const HeaderPadding = styled.div`
  padding: 0 14px 0 21px;
`;
const NoDataMessage = styled.div`
  width:100%;
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
const MypageRecord: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  // 위에 있는 친구로 넣으면 됨됨
    const handleSortToggle = () => {
      setIsReversed((prev) => !prev);
    };
  const queryClient = useQueryClient();


  const [modalStates, setModalStates] = useState<{ [key: number]: boolean }>({});
  const [deleteStates, setDeleteStates] = useState<{ [key: number]: boolean }>({});

  // 수정 모달 열기 & 닫기
  const openModal = (id: number) => {
    setModalStates((prev) => ({ ...prev, [id]: true }));
  };
  const closeModal = (id: number) => {
    setModalStates((prev) => ({ ...prev, [id]: false }));
  };

  // 삭제 모달 열기 & 닫기
  const openDeleteModal = (id: number) => {
    setDeleteStates((prev) => ({ ...prev, [id]: true }));
  };
  const closeDeleteModal = (id: number) => {
    setDeleteStates((prev) => ({ ...prev, [id]: false }));
  };
  const deleteRecordMutation = useMutation({
    mutationFn: (BeverageLogId: number) => DeleteRecordingDrinks(BeverageLogId),
    onSuccess: () => {
      // ✅ 삭제 후, 최신 데이터로 UI 업데이트
      queryClient.invalidateQueries({ queryKey: ['recordingDrinks'] });
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });
  const handleDelete = (BeverageLogId: number) => {
    deleteRecordMutation.mutate(BeverageLogId);
    console.log(BeverageLogId)
    closeDeleteModal(BeverageLogId); // 모달 닫기
  };
  // 검색 
    const [searchTerm, setSearchTerm] = useState("");
  
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
InfiniteRecordDrinkData,
  Error,
  InfiniteRecordDrinkData,
  number
>({
  // 각 페이지의 반환 타입
  // 에러 타입
  // 단일 페이지의 데이터 타입
  // PageParam의 타입
  queryKey: ["recordingDrinks", isReversed],
  queryFn: (
    { pageParam = 0 }: { pageParam: number }, // pageParam의 형식지정 number로 안하면 'unknown' 형식은 'number'형식에 할당할 수 없습니다 라는 오류 발생
  ) =>
    fetchRecoringDrinks(
      pageParam,
      isReversed
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
    .filter((drink) => searchTerm ? drink.beverageName.toLowerCase().includes(searchTerm.toLowerCase()) : true) || [];


  return (
    <>
      <HeaderPadding>
        <Header headerTitle="나의 기록 목록" confirmButton="완료" />
      </HeaderPadding>
      <Padding>
        <SearchInput
          id="SearchDrink"
          type="input"
          placeholder="검색어로 빠르게 기록 찾기"
          register={register}
          onSearch={handleSearchClick}
        />
      </Padding>
      <Arrangement title="내가 기록한 음료"handleSortToggle={handleSortToggle} />

      {filteredDrinks.length === 0 ? (
        <NoDataMessage>아직 기록이 없습니다.</NoDataMessage>
      ) : (
        filteredDrinks
          .map((drinkItem)  => (
        <div key={drinkItem.beverageLogId}>
          

          <MypageDrinkInfo 
            drink={drinkItem} 
            onClick={() => openModal(drinkItem.beverageLogId)} 
            onClick1={() => openDeleteModal(drinkItem.beverageLogId)} 
          />

          {/* 수정 모달 */}
          {modalStates[drinkItem.beverageLogId] && (
            <EditModal 
              onClick={() => closeModal(drinkItem.beverageLogId)} 
              // onClick1={() => closeModal(drink.beverageLogId)} 
              drink={drinkItem} 
              
            />
          )}

          {/* 삭제 확인 모달 */}
          {deleteStates[drinkItem.beverageLogId] && (
            <DeleModal 
              onClick={() => closeDeleteModal(drinkItem.beverageLogId)} 
              onClick1={() => handleDelete(drinkItem.beverageLogId)} 
              drink={drinkItem.beverageName} 
              brand={drinkItem.brand} 
            />
          )}
          {isFetchingNextPage && <div>Loading more drinks...</div>}
          <div ref={target}></div>
        </div>
      )))}
    </>
  );
};

export default MypageRecord;
