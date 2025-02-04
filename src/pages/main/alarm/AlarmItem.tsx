import React from 'react';
import warning from '../../../assets/warning.png';

interface AlarmItemProps {
  // date: string;
  time?: string;
  cafeName?: string;
  drinkName?: string;
  sugarAlarm?: number;
}

// css가 의도한 대로 적용되긴 하는데 왜 되는지 모르겠음...
const AlarmItem = (props: AlarmItemProps) => {
  return (
    <div className="flex px-[10px] py-[18px] justify-between  border-b border-1-[#F4F4F4]">
      {props.time && (
        <div className="flex items-center flex-1">
          <span className="flex w-[63px] justify-center items-center text-center py-[6px] rounded-full bg-[#F4F4F4] text-primary text-[14px]">
            {props.time}
          </span>
          <span className="font-[500] w-[50px] flex-grow text-[15px] truncate mx-[10px] justify-start">
            {props.cafeName}&nbsp;{props.drinkName}
          </span>
        </div>
      )}

      {props.sugarAlarm && (
        <div className='flex items-center flex-1'>
          <img
            src={warning}
            alt="당 섭취량 경고"
            className="w-[16px] h-[16px] ml-2"
          />
          <span className='font-[500] w-[50px] flex-grow text-[15px] truncate mx-[15px] justify-start'>당 {props.sugarAlarm}g 기록, 주의 필요!</span>
        </div>
      )}

      <button
        type="button"
        className="flex w-[63px] justify-center items-center text-center py-[6px] rounded-full bg-primary text-white text-[14px]"
      >
        보기
      </button>
    </div>
  );
};

export default AlarmItem;
