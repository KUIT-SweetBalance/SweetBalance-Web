import React from 'react';
import useAlarmInfoModalStore from '../../../store/modal/AlarmInfo';

const AlarmInfoModal = () => {
  const {
    isOpen,
    closeModal,
    image,
    date,
    time,
    cafeName,
    drinkName,
    sugar,
    syrupType,
    syrup,
    size,
  } = useAlarmInfoModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[-30px] bg-black bg-opacity-10 flex items-center justify-center z-1000">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)] space-y-[18px]">
        <p className="text-[16px]">
          {date}&nbsp;{time}
        </p>

        <div>
          <p className="text-[25px]">{cafeName}</p>
          <p className="text-[25px] font-[600]">{drinkName}</p>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={image}
            alt="음료사진"
            className="w-[181px] h-[181px] rounded-full"
          />
        </div>

        <div className="flex text-center mx-[10px] justify-between text-[16px] px-[15px] whitespace-nowrap">
          <span className="">당 {sugar}g</span>
          {syrupType === null || syrupType === '' ? (
            <span className="w-[80px] truncate">시럽없음</span>
          ) : (
            <span className="w-[80px] truncate">
              {syrupType}&nbsp;{syrup}
            </span>
          )}
          <span className="">{size}</span>
        </div>

        <button
          className="w-full rounded-full bg-primary text-white text-center py-[14px]"
          type="button"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlarmInfoModal;
