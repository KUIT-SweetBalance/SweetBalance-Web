import React, { useState } from 'react';
import { DrinkInfoProps } from '../../types/drink';
import { useNavigate } from 'react-router-dom';
import useLargeFavoriteDrinkModalStore from '../../store/modal/LargeFavoriteModalStore';
import useEditDrinkModalStore from '../../store/modal/EditDrinkModal';

const DrinkInfo = (props: DrinkInfoProps) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<boolean>(false);

  // 즐겨찾기 추가 모달창 띄우기
  const { openFavoriteModal } = useLargeFavoriteDrinkModalStore();
  const handleFavoriteButtonClick = () => {
    console.log('Clicked');
    setSelected(!selected);
    if (!selected) {
      const modalData = {
        cafeName:
          props.cafeNameMiddle ||
          props.cafeNameTop ||
          props.cafeNameBottom ||
          '',
        drinkName: props.drinkName || '',
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
      button2: '수정할래요'
    };

    openEditModal(modalData)
  };

  // 음료 삭제 모달창 띄우기

  return (
    <div className="w-full px-[24px] py-[14px] flex border-b border-1-[#F4F4F4]">
      {/* 왼쪽 */}
      <div className="w-[74px] h-[74px] flex-shrink-0 bg-[#F4F4F4] rounded-full mr-[25px]"></div>

      {/* 오른쪽 */}
      <div className="flex flex-col w-full justify-center">
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
              <button type="button" className="w-[14px] h-[14px]" onClick={handleEditButtonClick}>
                <img src="/EditDrink.png" alt="음료수정" />
              </button>
              <button type="button" className="w-[14px] h-[14px]">
                <img src="/X.png" alt="음료삭제" />
              </button>
            </div>
          )}
        </div>

        {/* 중단 */}
        <div className="flex justify-between mt-[2px] items-center">
          <div className="flex items-center">
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
                src={selected ? '/star-filled.png' : '/star.png'}
                alt="저장"
                className="w-[14px] h-[13.3px]"
              />
            </button>
          )}
        </div>

        {/* 하단 */}
        {/* pr-[10px] border-r border-[#909090] */}
        <div className="flex text-[12px] space-x-[20px] mt-[5px] items-start">
          {props.cafeNameBottom && (
            <span className="flex items-start">{props.cafeNameBottom}</span>
          )}
          {props.sugar && (
            <span className="flex items-start ">당 {props.sugar}g</span>
          )}
          {props.syrup && (
            <span className="flex items-start ">
              {props.syrupType}&nbsp;{props.syrup}
            </span>
          )}
          {props.size && <span className="flex items-start">{props.size}</span>}
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default DrinkInfo;
