import React, { useState } from 'react';
import { DrinkInfoProps } from '../../types/drink';
import { useNavigate } from 'react-router-dom';
import useLargeFavoriteDrinkModalStore from '../../store/modal/LargeFavoriteModalStore';
import useEditDrinkModalStore from '../../store/modal/EditDrinkModal';
import useDeleteDrinkModalStore from '../../store/modal/DeleteDrinkModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScrapCustomDrink } from '../../api/custom/custommain';
import { DeleteScrapDrinks } from '../../api/mypage/scrap/MypageScrap';

// RecordingDrink

const DrinkInfo = (props: DrinkInfoProps) => {
  const navigate = useNavigate();
const queryClient = useQueryClient();
  const [selected, setSelected] = useState<boolean>();
  const scrapMutation = useMutation({
    mutationFn: ScrapCustomDrink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customDrink"] }); // 최신 데이터 가져오기
    },
    onError: (error) => {
      console.error("즐겨찾기 추가 실패 ❌:", error);
      alert("즐겨찾기 추가 중 오류 발생 ❌");
    },
  });
  const deleteScrapMutation = useMutation({
    mutationFn: (favoriteId: number) => DeleteScrapDrinks(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customDrink"] }); // 최신 데이터 가져오기
    },
    onError: (error) => {
      console.error("삭제 실패 ❌:", error);
    },
  });
  // 즐겨찾기 추가 모달창 띄우기
  const { openFavoriteModal } = useLargeFavoriteDrinkModalStore();
  const handleFavoriteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    console.log('Clicked');

    if(!selected){
      scrapMutation.mutate(props.drinkData.beverageId)
      console.log("추가완료")
    }
    else{
      deleteScrapMutation.mutate(props.drinkData.beverageId)
      console.log("삭제완료")
    }

    setSelected(!selected);

    if (!selected) {
      const modalData = {
        cafeName:
          props.cafeNameMiddle ||
          props.cafeNameTop ||
          props.cafeNameBottom ||
          '',
        drinkName: props.drinkName || '',
        imgUrl: props.imgUrl,
        sugar: props.sugar,
        syrupType: props.syrupType,
        syrup: props.syrup,
        size: props.size,
      };

      openFavoriteModal(modalData);
    }
  };

  // 음료 수정 모달창 띄우기
  const { openEditModal } = useEditDrinkModalStore();
  const handleEditButtonClick = () => {
    const modalData = {
      cafeName:
        props.cafeNameMiddle || props.cafeNameTop || props.cafeNameBottom || '',
      drinkName: props.drinkName || '',
      content: '을/를 수정하시겠어요?',
      button1: '아니오',
      button2: '수정할래요',
    };

    openEditModal(modalData);
  };

  // 음료 삭제 모달창 띄우기
  const { openDeleteModal } = useDeleteDrinkModalStore();
  const handleDeleteButtonClick = () => {
    const modalData = {
      cafeName:
      props.cafeNameMiddle || props.cafeNameTop || props.cafeNameBottom || '',
      drinkName: props.drinkName || '',
      content: '을/를 수정하시겠어요?',
      button1: '아니오',
      button2: '수정할래요',
    };
  };

  const handleDrinkInfoClick = () => {
    console.log('clicked')
    navigate(`/custom/${props.drinkData.beverageId}`);
  }

  return (
    <button type="button" onClick={handleDrinkInfoClick} className='w-full'>
      <div className="w-full px-[24px] py-[14px] flex border-b border-1-[#F4F4F4]">
        {/* 왼쪽 */}
        <img
          src={props.imgUrl}
          alt="음료 사진"
          className="w-[74px] h-[74px] flex-shrink-0 bg-[#F4F4F4] rounded-full mr-[25px]"
        />

        {/* 오른쪽 */}
        <div className="flex flex-col w-full justify-center overflow-hidden">
          {/* 상단 */}
          <div className="flex justify-between">
            {props.dateAndTime && (
              <div className="text-[12px] ">{props.dateAndTime}</div>
            )}
            {props.cafeNameTop && (
              <div className="text-[12px]">{props.cafeNameTop}</div>
            )}

            {props.isEditDeleteBtnExist && (
              <div className="space-x-[10px]">
                <button
                  type="button"
                  className="w-[14px] h-[14px]"
                  onClick={(event) => {
                    event.stopPropagation(); // 이벤트 버블링 방지
                    props.onClick?.(event);
                  }}
                >
                  <img src="/EditDrink.png" alt="음료수정" />
                </button>
                <button
                  type="button"
                  className="w-[14px] h-[14px]"
                  onClick={(event) => {
                    event.stopPropagation(); // 이벤트 버블링 방지
                    props.onClick1?.(event);
                  }}
                >
                  <img src="/X.png" alt="음료삭제" />
                </button>
              </div>
            )}
          </div>

          {/* 중단 */}
          <div className="flex justify-between mt-[2px] items-center">
            <div className="flex items-center overflow-hidden">
              {props.cafeNameMiddle && (
                <span className="text-[14px] font-[500] mr-[7px]">
                  {props.cafeNameMiddle}
                </span>
              )}
              <div className="text-[16px] font-[500] truncate">
                {props.drinkName}
              </div>
            </div>

            {props.isFavoriteBtnExist && (
              <button
                type="button"
                className="flex w-[24px] h-[24px] justify-center items-center"
                onClick={handleFavoriteButtonClick}
              >
                <img
                  src={props.favorite ? '/star-filled.png' : '/star.png'}
                  alt="저장"
                  className="w-[14px] h-[13.3px]"
                />
              </button>
            )}
          </div>

          {/* 하단 */}
          {/* pr-[10px] border-r border-[#909090] */}
          <div className="flex text-[12px] space-x-[20px] mt-[5px] items-start whitespace-nowrap">
            {props.cafeNameBottom && (
              <span className="flex items-start">{props.cafeNameBottom}</span>
            )}
            {Number.isFinite(props.sugar) && (
              <span className="flex items-start ">당 {props.sugar}g</span>
            )}
            {props.syrupType === null ? (
              <span className="flex items-start ">시럽없음</span>
            ) : (
              <span className="flex items-start ">
                {props.syrupType}&nbsp;{props.syrup}
              </span>
            )}
            {props.size && (
              <span className="flex items-start">{props.size}</span>
            )}
          </div>

          <div className=""></div>
        </div>
      </div>
    </button>
  );
};

export default DrinkInfo;
