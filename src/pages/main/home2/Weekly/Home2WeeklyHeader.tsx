import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeeklySugarChart from './WeeklySugarChart';
import { useQuery } from '@tanstack/react-query';
import {
  WeeklyNutritionIntakeResponse,
  fetchWeeklyNutritionIntake,
} from '../../../../api/main/home2/Weekly/Home2WeeklyHeader';
import WeeklyIntakeStatBox from './WeeklyIntakeStatBox';

const Home2WeeklyHeader = () => {
  const navigate = useNavigate();
  const handleAlarmClick = () => {
    navigate('/alarm');
  };

  // dummy data
  const sugarData = [30, 10, 25, 32, 30, 0, 35]; // 일요일~토요일 섭취량 데이터
  const startDate = '10월 16일';
  const endDate = '10월 23일';

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
  const fetchedSugarData =
    fetchedData?.dailySugar.map((dailySugar) => dailySugar.sugar) ?? [];
  const fetchedDateData =
    fetchedData?.dailySugar.map(({ date }) => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('ko-KR', {
        // 'ko-KR'에 의해 자동으로 '월'과 '일'이 붙음
        month: 'long', // '2월 '
        day: 'numeric', // '1'
      });
    }) ?? [];

  const [todayWeekDay, setTodayWeekDay] = useState<string>('');
  const [todayWeekDayIndex, setTodayWeekDayIndex] = useState(0);
  const weekDays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  useEffect(() => {
    const today = new Date();
    setTodayWeekDay(weekDays[today.getDay()]); // 현재 요일 문자열로
    setTodayWeekDayIndex(today.getDay());
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between px-[24px] py-[20px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button type="button" className="w-[8px] h-[13px]">
              <img src="/chevron-left.png" alt="지난주" />
            </button>
            <span className="text-[13px] text-white text-opacity-50 pt-[2px]">
              {fetchedDateData[0]}&nbsp;-&nbsp;
              {fetchedDateData[fetchedDateData.length - 1]}
            </span>
            <button type="button" className="w-[8px] h-[13px]">
              <img src="/chevron-right.png" alt="다음주" />
            </button>
          </div>

          <p className="text-[28px] text-secondary">
            오늘은{' '}
            <span className="text-[28px] text-white">{todayWeekDay}</span>
          </p>
        </div>

        <button
          type="button"
          className="w-[39px] h-[39px] flex items-center justify-center border rounded-full"
          onClick={handleAlarmClick}
        >
          <div className="relative inline-block">
            <img src="/bell2.png" alt="알림" className="w-[16px] h-[18px]" />
            <div className="absolute top-0 right-0 w-[6px] h-[6px] bg-alert rounded-full"></div>
          </div>
        </button>
      </div>

      <div className="mt-[40px] h-[200px]">
        <WeeklySugarChart
          data={fetchedSugarData}
          todayWeekDayIndex={todayWeekDayIndex}
        />
      </div>
    </div>
  );
};

export default Home2WeeklyHeader;
