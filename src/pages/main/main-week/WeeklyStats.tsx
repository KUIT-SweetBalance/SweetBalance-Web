import React from 'react';

interface WeeklyStatsProps {
  title: string;
  weeklySugarIntake?: number;
  weeklyDrinkIntake?: number;
  dailySugarIntake?: number;
  weeklyKcalIntake?: number;
}

const WeeklyStats = (props: WeeklyStatsProps) => {
  return (
    <div className="flex flex-col flex-1 h-[226px] border rounded-lg p-3">
      <div className="flex justify-start text-sm ml-1">{props.title}</div>

      {props.weeklySugarIntake && (
        <div className="flex justify-start text-[30px] ml-1 mt-1">
          {props.weeklySugarIntake}g
        </div>
      )}

      <div className="flex-grow"></div>

      {props.weeklyDrinkIntake && (
        <div className="flex justify-end items-baseline mb-[-4px]">
          <span className="text-[50px]">{props.weeklyDrinkIntake}</span>
          <span className="text-[20px] ml-1">잔</span>
        </div>
      )}

      <div className="flex flex-col space-y-2 mb-1">
        {props.dailySugarIntake && (
          <div className="flex justify-end space-x-[10px] items-baseline">
            <span className="text-[12px]">하루 평균 당 섭취량</span>
            <span className="text-[14px] font-medium">
              {props.dailySugarIntake}g
            </span>
          </div>
        )}

        {props.weeklyKcalIntake && (
          <div className="flex justify-end space-x-[10px] items-baseline mb-3">
            <span className="text-[12px]">주간 칼로리 섭취량</span>
            <span className="text-[14px] font-medium">
              {props.weeklyKcalIntake}kcal
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyStats;
