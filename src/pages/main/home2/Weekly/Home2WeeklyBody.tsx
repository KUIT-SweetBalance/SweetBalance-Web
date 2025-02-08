import React from 'react';
import WeeklyIntakeStatBox from './WeeklyIntakeStatBox';
import { useQuery } from '@tanstack/react-query';
import { WeeklyNutritionIntakeResponse, fetchWeeklyNutritionIntake } from '../../../../api/main/home2/Weekly/Home2WeeklyHeader';

const Home2WeeklyBody = () => {
  // query instance
  const {
    data: weeklyNutritionIntake,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<WeeklyNutritionIntakeResponse, Error>({
    queryKey: ['WeeklyNutritionIntakeResponse'],
    queryFn: fetchWeeklyNutritionIntake,
  });
  const fetchedData = weeklyNutritionIntake?.data;

  return (
    <div>
      <div className="mt-[20px] ml-[34px] mb-[20px] text-[18px]">
        주간 당 통계를 분석했어요!
      </div>

      <div className="grid grid-cols-2 gap-[10px] mx-[24px]">
        <WeeklyIntakeStatBox
          type="주간 음료 섭취량"
          stat={fetchedData?.intake}
          unit="잔"
          recommended={12}
        />
        <WeeklyIntakeStatBox
          type="하루 평균 당 섭취량"
          stat={fetchedData?.averageSugar}
          unit="g"
          recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 당 섭취량"
          stat={fetchedData?.totalSugar}
          unit="g"
          recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 칼로리 섭취량"
          stat={fetchedData?.totalCalories}
          unit="kcal"
          recommended={12}
        />
      </div>
    </div>
  );
};

export default Home2WeeklyBody;
