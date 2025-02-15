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

  // 오늘을 기준으로 가장 최근의 일요일 찾기
  const getLastSunday = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 일: 0, 월: 1, 화: 2, ...
    const daysToLastSunday = dayOfWeek; // 마지막 일요일 이후 며칠이 지났는지

    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - daysToLastSunday); // getDate(): 2월8일이라면 8을 반환함
    return lastSunday;
  };

  // YYYY-MM-DD 형식으로 변환
  const dateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월(0부터 시작하므로 +1)
    const day = String(date.getDate()).padStart(2, '0'); // 일
    // padStart(): 문자열의 길이가 지정된 길이(2)보타 짧으면 앞에 특정 문자('0')를 추가
    return `${year}-${month}-${day}`;
  };

  const [selectedSunday, setSelectedSunday] = useState(getLastSunday());
  const [thisWeekSunday, setThisWeekSunday] = useState(getLastSunday());

  // 주 이동 < > 버튼
  const handleLastWeekClick = () => {
    const newDate = new Date(selectedSunday);
    newDate.setDate(selectedSunday.getDate() - 7);
    setSelectedSunday(newDate);
  };
  const handleNextWeekClick = () => {
    const newDate = new Date(selectedSunday);
    newDate.setDate(selectedSunday.getDate() + 7);
    setSelectedSunday(newDate);
  };

  // query instance
  const {
    data: weeklyNutritionIntake,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<WeeklyNutritionIntakeResponse, Error>({
    queryKey: ['WeeklyNutritionIntakeResponse', selectedSunday],
    queryFn: () => fetchWeeklyNutritionIntake(dateToString(selectedSunday)),
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

  // '오늘은 O요일이에요'
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
            <button
              type="button"
              className="w-[8px] h-[13px]"
              onClick={handleLastWeekClick}
            >
              <img src="/chevron-left.png" alt="지난주" />
            </button>
            <span className="text-[13px] text-white text-opacity-50 pt-[2px]">
              {fetchedDateData[0]}&nbsp;-&nbsp;
              {fetchedDateData[fetchedDateData.length - 1]}
            </span>
            <button
              type="button"
              className={`w-[8px] h-[13px] ${selectedSunday.getDate() === thisWeekSunday.getDate() ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              onClick={handleNextWeekClick}
              disabled={selectedSunday.getDate() === thisWeekSunday.getDate()}
            >
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
