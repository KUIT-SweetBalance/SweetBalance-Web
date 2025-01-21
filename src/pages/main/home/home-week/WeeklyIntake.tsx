import React from 'react';
import WeeklySugarChart from './WeeklySugarChart';

const WeeklyIntake = () => {
  const sugarData = [10, 20, 30, 50, 40, 70, 35]; // 일요일~토요일 섭취량 데이터
  const startDate = '10월 16일';
  const endDate = '10월 23일';

  return (
    <div
      className="w-full h-[225px] flex flex-col p-5 border shadow-lg rounded-3xl"
      style={{
        boxShadow: '0 0px 15px rgba(0, 0, 0, 0.1)', // X축 0, Y축 10px
      }}
    >
      <WeeklySugarChart
        data={sugarData}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default WeeklyIntake;
