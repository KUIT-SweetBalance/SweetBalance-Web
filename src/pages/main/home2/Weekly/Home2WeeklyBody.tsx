import React from 'react';
import WeeklyIntakeStatBox from './WeeklyIntakeStatBox';
import { useQuery } from '@tanstack/react-query';
import {
  WeeklyNutritionIntakeResponse,
  fetchWeeklyNutritionIntake,
} from '../../../../api/main/home2/Weekly/Home2WeeklyHeader';

const Home2WeeklyBody = () => {
  // 오늘을 기준으로 가장 최근의 일요일 찾기
  const getLastSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 일: 0, 월: 1, 화: 2, ...
    const daysToLastSunday = dayOfWeek; // 마지막 일요일 이후 며칠이 지났는지

    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - daysToLastSunday); // getDate(): 2월8일이라면 8을 반환함

    // YYYY-MM-DD 형식으로 변환
    const year = lastSunday.getFullYear();
    const month = String(lastSunday.getMonth() + 1).padStart(2, '0'); // 월(0부터 시작하므로 +1)
    const day = String(lastSunday.getDate()).padStart(2, '0'); // 일
    // padStart(): 문자열의 길이가 지정된 길이(2)보타 짧으면 앞에 특정 문자('0')를 추가
    return `${year}-${month}-${day}`;
  };
  const lastSunday = getLastSunday(); //

  const storedGender = localStorage.getItem('gender'); // 저장된 성별 값 불러오기
  const userGender = storedGender ? storedGender : 'MALE';

  // query instance
  const {
    data: weeklyNutritionIntake,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<WeeklyNutritionIntakeResponse, Error>({
    queryKey: ['WeeklyNutritionIntakeResponse', lastSunday],
    queryFn: () => fetchWeeklyNutritionIntake(lastSunday),
  });
  const fetchedData = weeklyNutritionIntake?.data;

  return (
    <div className="w-full">
      <div className="mt-[20px] ml-[34px] mb-[20px] text-[18px]">
        주간 당 통계를 분석했어요!
      </div>

      <div className="grid grid-cols-2 gap-[10px] mx-[24px]">
        <WeeklyIntakeStatBox
          type="하루 평균 당 섭취량"
          stat={fetchedData?.averageSugar}
          unit="g"
          recommended={userGender === 'MALE' ? 38 : 25}
        />
        <WeeklyIntakeStatBox
          type="주간 음료 섭취량"
          stat={fetchedData?.intake}
          unit="잔"
          // recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 당 섭취량"
          stat={fetchedData?.totalSugar}
          unit="g"
          // recommended={12}
        />
        <WeeklyIntakeStatBox
          type="주간 칼로리 섭취량"
          stat={fetchedData?.totalCalories}
          unit="kcal"
          // recommended={12}
        />
      </div>
    </div>
  );
};

export default Home2WeeklyBody;
