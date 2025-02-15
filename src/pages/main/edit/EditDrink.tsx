import React, { useState } from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import Header from '../../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import EditDrinkModal from '../modal/EditDrinkModal';
import NoContents from '../../../components/noContents/NoContents';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';
import useEditDrinkModalStore from '../../../store/modal/EditDrinkModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DrinkListTodayResponse,
  fetchDrinkListToday,
} from '../../../api/main/home2/Today/Home2TodayBody';
import Arrangement from '../../mypage/mypage-record/Arrangement';
import EditModal from '../../mypage/mypage-record/Edit/Editmodel';
import DeleModal from '../../mypage/mypage-record/Dele/Delemodal';
import Deleted from '../../mypage/mypage-record/Dele/Deleted';
import { DeleteRecordingDrinks } from '../../../api/mypage/record/MypageRecord';

const EditDrink = () => {
  const { isOpen } = useEditDrinkModalStore();

  const {
    data: drinkListTodayData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DrinkListTodayResponse, Error>({
    queryKey: ['drinkListTodayResponse'],
    queryFn: fetchDrinkListToday,
  });

  const queryClient = useQueryClient();

  // 각 음료별 모달 상태를 객체 형태로 관리
  const [modalStates, setModalStates] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [deleteStates, setDeleteStates] = useState<{ [key: number]: boolean }>(
    {},
  );

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
    mutationFn: (BeverageId: number) => DeleteRecordingDrinks(BeverageId),
    onSuccess: () => {
      // ✅ 삭제 후, 최신 데이터로 UI 업데이트
      queryClient.invalidateQueries({ queryKey: ['drinkListTodayResponse'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });

  const handleDelete = (BeverageId: number) => {
    deleteRecordMutation.mutate(BeverageId);
    console.log(BeverageId);
    closeDeleteModal(BeverageId); // 모달 닫기
  };

  if (!drinkListTodayData?.data || drinkListTodayData.data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center mt-[30px]">
        <div className="flex w-[calc(100%-48px)]">
          <Header headerTitle="수정하기" />
        </div>

        <div className="flex flex-col justify-between w-[calc(100%-48px)] ml-[10px] mt-5 mb-3">
          <div className="text-[17px]">오늘 마신 음료수</div>
        </div>

        <div className="flex-grow flex mb-[70px]">
          <NoContents contentString="아직 기록이 없습니다" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-[30px]">
      <div className="flex w-[calc(100%-48px)]">
        <Header headerTitle="수정하기" />
      </div>

      <div className="flex flex-col justify-between w-[calc(100%-48px)] ml-[10px] mt-5 mb-3">
        <div className="text-[17px]">오늘 마신 음료수</div>
        {/* <div className="text-[12px] text-gray_text mt-[6px]">
          하단 별 클릭 시 빠른 기록이 가능해요!
        </div> */}
        {/* <button type="button" className="text-[14px] text-[#909090]">
          수정하기
        </button> */}
      </div>

      {/* 음료 정보 */}
      <div className="flex flex-col w-full  mb-5">
        {drinkListTodayData?.data?.map((drink, index) => (
          <div>
            <DrinkInfo
              key={index}
              imgUrl={drink.imgUrl}
              dateAndTime={drink.createdAt}
              isEditDeleteBtnExist={true}
              cafeNameMiddle={drink.brand}
              drinkName={drink.beverageName}
              sugar={drink.sugar}
              syrupType={drink.syrupName}
              syrup={drink.syrupCount}
              size={drink.sizeType}
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
      </div>

      {/* <BottomNavi /> */}
      {isOpen && <EditDrinkModal />}
    </div>
  );
};

export default EditDrink;
