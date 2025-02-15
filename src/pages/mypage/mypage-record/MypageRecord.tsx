import React, { useState } from "react";
import { useQuery,useMutation, useQueryClient  } from "@tanstack/react-query";
import { useForm} from "react-hook-form";
import styled from "styled-components";

import Header from "../../../components/header/Header";
import SearchInput from "../../../components/input/searchInput/SearchInput";
import MypageDrinkInfo from "./MypageDrinkInfo";
import Arrangement from "./Arrangement";
import EditModal from "./Edit/Editmodel";
import DeleModal from "./Dele/Delemodal";
import Deleted from "./Dele/Deleted";
import { RecoringDrinkData, fetchRecoringDrinks,DeleteRecordingDrinks } from "../../../api/mypage/record/MypageRecord";

const Padding = styled.div`
  padding: 25px;
`;
const HeaderPadding = styled.div`
  padding: 0 14px 0 21px;
`;

const MypageRecord: React.FC = () => {
  // React Query로 음료 데이터 불러오기
  const { data, isLoading, error } = useQuery<RecoringDrinkData>({
    queryKey: ["recordingDrinks"],
    queryFn: fetchRecoringDrinks,
  });
  const queryClient = useQueryClient();

  // 음료 데이터를 가져오고, 없을 경우 빈 배열로 처리
  const drinks = data?.data || [];

  // 각 음료별 모달 상태를 객체 형태로 관리
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
      queryClient.invalidateQueries(["recordingDrinks"]);
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
  // 검색 기능
  const { getValues, register } = useForm();
  const handleSearchClick = () => {
    const inputValue = getValues("SearchDrink");
    console.log(inputValue);
  };

  // 로딩 및 에러 핸들링
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <HeaderPadding>
        <Header headerTitle="나의 기록 목록" confirmButton="완료" />
      </HeaderPadding>
      <Padding>
        <SearchInput
          id="MypageRecord"
          type="input"
          placeholder="검색어로 빠르게 기록 찾기"
          register={register}
          onSearch={handleSearchClick}
        />
      </Padding>
      <Arrangement title="내가 기록한 음료" />

      {drinks.map((drink) => (
        <div key={drink.beverageLogId}>
          {/* 음료 리스트 */}
          <MypageDrinkInfo 
            drink={drink} 
            onClick={() => openModal(drink.beverageLogId)} 
            onClick1={() => openDeleteModal(drink.beverageLogId)} 
          />

          {/* 수정 모달 */}
          {modalStates[drink.beverageLogId] && (
            <EditModal 
              onClick={() => closeModal(drink.beverageLogId)} 
              // onClick1={() => closeModal(drink.beverageLogId)} 
              drink={drink} 
              
            />
          )}

          {/* 삭제 확인 모달 */}
          {deleteStates[drink.beverageLogId] && (
            <DeleModal 
              onClick={() => closeDeleteModal(drink.beverageLogId)} 
              onClick1={() => handleDelete(drink.beverageLogId)} 
              drink={drink.beverageName} 
              brand={drink.brand} 
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MypageRecord;
