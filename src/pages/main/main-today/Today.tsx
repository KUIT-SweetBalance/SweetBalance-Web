import React from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import TodayWeekButton from './TodayWeekButton';
import DailyIntake from './DailyIntake';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import bell from '../../../assets/bell.png';
import line3 from '../../../assets/line3.png';

const Today = () => {
  return (
    <div className="flex flex-col items-center">
      {/* SweetBalance 타이틀 */}
      <AppTitle />

      {/* UserGreeting 컴포넌트(안녕하세요 달달해님! ~ ) */}
      <div className="flex flex-row justify-between space-x-8 mx-[34px]">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="text-lg font-normal">안녕하세요,&nbsp;</div>
            <div className="text-lg font-medium">달달해</div>
            <div className="text-lg font-normal">님!</div>
          </div>
          <div className="text-sm text-[#121212]">
            오늘도 활기차게 당 관리를 시작해볼까요?
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border rounded-full"
          >
            <img src={bell} alt="알림" className="w-4 h-5" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center"
          >
            <img src={line3} alt="메뉴" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 오늘/주간 버튼 */}
      <div className="mt-6 mb-4 w-[calc(100%-68px)]">
        <TodayWeekButton></TodayWeekButton>
      </div>

      {/* 표 */}
      <div className="w-[calc(100%-68px)] mt-3">
        <DailyIntake></DailyIntake>
      </div>

      {/* 경계선 */}
      <div className="w-full h-[15px] mt-7 bg-[#F4F4F4]"></div>

      {/* 오늘 마신 음료수 */}
      <div className="flex justify-between w-[calc(100%-68px)] mt-6 mb-5">
        <div className="text-[18px]">오늘 마신 음료수</div>
        <button type="button" className="text-[14px]">
          수정하기
        </button>
      </div>

      {/* 음료 정보 */}
      <div className='flex flex-col w-[calc(100%-60px)]'>
        <DrinkInfo></DrinkInfo>
        <DrinkInfo></DrinkInfo>
        <DrinkInfo></DrinkInfo>
        <DrinkInfo></DrinkInfo>
      </div>
    </div>
  );
};

export default Today;
