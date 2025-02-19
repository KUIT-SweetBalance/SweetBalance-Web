import React, { useState } from 'react';
import TodayWeekSwitcher from './TodayWeekSwitcher';
import Home2TodayHeader from './Today/Home2TodayHeader';
import Home2WeeklyHeader from './Weekly/Home2WeeklyHeader';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';
import Home2TodayBody from './Today/Home2TodayBody';
import Home2WeeklyBody from './Weekly/Home2WeeklyBody';

const Home2 = () => {
  const [selectedView, setSelectedView] = useState<'today' | 'week'>('today');

  return (
    <div className="flex flex-col h-screen mb-[100px]">
      <TodayWeekSwitcher
        selected={selectedView}
        onChange={(view) => setSelectedView(view)}
      />

      <div
        className="flex flex-shrink-0 flex-col w-full h-[367px] rounded-bl-[20px] rounded-br-[20px] mt-[-2px] bg-primary"
      >
        {selectedView === 'today' ? (
          <Home2TodayHeader />
        ) : (
          <Home2WeeklyHeader />
        )}
      </div>

      <div className="flex w-full flex-grow mt-[10px]">
        {selectedView === 'today' ? <Home2TodayBody /> : <Home2WeeklyBody />}
      </div>

      <div>
        <BottomNavi />
      </div>
    </div>
  );
};

export default Home2;
