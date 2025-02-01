import React from 'react';
import WeeklySugarChart from './WeeklySugarChart';

const Home2WeeklyHeader = () => {
  const sugarData = [30, 10, 25, 32, 30, 0, 35]; // 일요일~토요일 섭취량 데이터
  const startDate = '10월 16일';
  const endDate = '10월 23일';

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between px-[24px] py-[20px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button type="button" className="w-[8px] h-[13px]">
              <img src="/chevron-left.png" alt="지난주" />
            </button>
            <span className="text-[13px] text-white text-opacity-50 pt-[2px]">
              10월 16일 - 10월 23일
            </span>
            <button type="button" className="w-[8px] h-[13px]">
              <img src="/chevron-right.png" alt="다음주" />
            </button>
          </div>

          <p className="text-[28px] text-secondary">
            오늘은 <span className="text-[28px] text-white">토요일</span>
          </p>
        </div>

        <button
          type="button"
          className="w-[39px] h-[39px] flex items-center justify-center border rounded-full"
          // onClick={handleAlarmClick}
        >
          <img src="/bell2.png" alt="알림" className="w-[16px] h-[18px]" />
        </button>
      </div>

      <div className='mt-[40px] h-[200px]'>
        <WeeklySugarChart
          data={sugarData}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default Home2WeeklyHeader;
