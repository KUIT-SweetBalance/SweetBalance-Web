import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTitle from '../../../components/appTitle/AppTitle';
import TodayWeekSwitcher from './TodayWeekSwitcher';
import bell from '../../../assets/bell.png';
import line3 from '../../../assets/line3.png';
import DailyInfo from './home-today/DailyInfo';
import WeeklyInfo from './home-week/WeeklyInfo';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';

const Home = () => {
  const [selectedView, setSelectedView] = useState<'today' | 'week'>('today');
  const navigate = useNavigate();
  const handleAlarmClick = () => {
    navigate('/alarm');
  };

  return (
    <div className="flex flex-col items-center">
      {/* SweetBalance 타이틀 */}
      <AppTitle />

      {/* UserGreeting 컴포넌트(안녕하세요 달달해님! ~ ) */}
      <div className="flex flex-row w-[calc(100%-48px)] justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="text-lg font-normal">안녕하세요,&nbsp;</div>
            <div className="text-lg font-medium">달달해</div>
            <div className="text-lg font-normal">님!</div>
          </div>
          <div className="text-sm text-[#909090]">
            오늘도 활기차게 당 관리를 시작해볼까요?
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border rounded-full"
            onClick={handleAlarmClick}
          >
            <img src={bell} alt="알림" className="w-4 h-5" />
          </button>
          <button
            type="button"
            className="h-12 ml-4 mr-1 flex items-center justify-center"
          >
            <img src={line3} alt="메뉴" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 오늘/주간 버튼 */}
      <div className="mt-6 mb-4 w-[calc(100%-48px)]">
        <TodayWeekSwitcher
          selected={selectedView}
          onChange={(view) => setSelectedView(view)}
        />
      </div>

      <div className="w-full">
        {selectedView === 'today' ? <DailyInfo /> : <WeeklyInfo />}
      </div>

      <div className='m-5'>
        <BottomNavi />
      </div>
    </div>
  );
};

export default Home;
