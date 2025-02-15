import React from 'react';
import Header from '../../../components/header/Header'; 
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import { useQuery ,useMutation, useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components';
import { useState } from 'react';
import Arrangement from '../mypage-record/Arrangement';
import DeleModal from '../mypage-record/Dele/Delemodal';
import { ScrapDrinkData,fetchScrapDrinks,DeleteScrapDrinks} from "../../../api/mypage/scrap/MypageScrap";
import MypageScrapInfo from './MypageScrapinfo';

const Padding = styled.div`
padding: 25px;
`;
const HeaderPadding = styled.div`
  padding: 0 14px 0 21px;
`;


const MypageScrap: React.FC = () => {
  const { data, isLoading, error } = useQuery<ScrapDrinkData>({
      queryKey: ["scrapDrinks"],
      queryFn: fetchScrapDrinks,
    });
    const queryClient = useQueryClient();
    // 음료 데이터를 가져오고, 없을 경우 빈 배열로 처리
    const drinks = data?.data || [];

  const [deleteStates, setDeleteStates] = useState<{ [key: number]: boolean }>({});
  
  const openDeleteModal = (id: number) => {
    setDeleteStates((prev) => ({ ...prev, [id]: true }));
  };
  const closeDeleteModal = (id: number) => {
    setDeleteStates((prev) => ({ ...prev, [id]: false }));
  };
  
  const deleteScrapMutation = useMutation({
    mutationFn: (favoriteId: number) => DeleteScrapDrinks(favoriteId),
    onSuccess: () => {
      // ✅ 삭제 후, 최신 데이터로 UI 업데이트
      queryClient.invalidateQueries(["scrapDrinks"]);
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });
  const handleDelete = (favoriteId: number) => {
    deleteScrapMutation.mutate(favoriteId);
    console.log(favoriteId)
    closeDeleteModal(favoriteId); // 모달 닫기
  };
    const {
      // watch, // 입력 필드 값 실시간 확인e
      getValues, // 입력값 가져오기
      register, // 유효성 검사와 값 관리에 사용
    } = useForm(); // mode: onChange로 설정
    const handleSearchClick = () => {
      const inputValue = getValues('SearchDrink');
      console.log(inputValue);
    };
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
        <HeaderPadding>
        <Header headerTitle='나의 즐겨찾기 목록' confirmButton='완료' />
        </HeaderPadding>
        <Padding>
            <SearchInput id='MypageRecord' type='input' placeholder='검색어로 빠르게 기록 찾기' register={register}
            onSearch={handleSearchClick} />
        </Padding>
        <Arrangement title ='내가 즐겨찾기한 음료'/>
        {drinks.map((drink) => (
        <div key={drink.favoriteId}>
          {/* 음료 리스트 */}
          <MypageScrapInfo 
            drink={drink} 
            onClick={() => openDeleteModal(drink.favoriteId)}  
          />

          {/* 삭제 확인 모달 */}
          {deleteStates[drink.favoriteId] && (
            <DeleModal 
              onClick={() => closeDeleteModal(drink.favoriteId)} 
              onClick1={() => handleDelete(drink.favoriteId)} 
              drink={drink.name}
              brand={drink.brand}
            />
          )}
        </div>
      ))}

        </>
    );
};

export default MypageScrap;