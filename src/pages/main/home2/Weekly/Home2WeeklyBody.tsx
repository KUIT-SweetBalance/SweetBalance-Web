import React from 'react';
import WeeklyIntakeStatBox from './WeeklyIntakeStatBox';

const Home2WeeklyBody = () => {
  return (
    <div>
      <div className="mt-[20px] ml-[34px] mb-[20px] text-[18px]">
        주간 당 통계를 분석했어요!
      </div>

      <div className="grid grid-cols-2 gap-[10px] mx-[24px]">
        <WeeklyIntakeStatBox
          type="주간 음료 섭취량"
          stat={12}
          unit="잔"
          recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 음료 섭취량"
          stat={12}
          unit="잔"
          recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 음료 섭취량"
          stat={12}
          unit="잔"
          recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 음료 섭취량"
          stat={12}
          unit="잔"
          recommended={12}
        />
      </div>
    </div>
  );
};

export default Home2WeeklyBody;
