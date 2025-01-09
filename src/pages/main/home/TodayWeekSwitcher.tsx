import React, { useState } from 'react';

// TodayWeekButton의 너비는 w-full, 즉 부모 컨테이너의 가로 전체 길이를 따름
// TodayWeekButton을 div 등으로 감싸고 해당 div의 너비를 설정함으로써 TodayWeekButton의 너비를 정하면 됨
const TodayWeekSwitcher = () => {
  const [selected, setSelected] = useState<'today' | 'week'>('today');

  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-white border w-full h-10 justify-between items-center rounded-full">
        <button
          type="button"
          onClick={() => setSelected('today')}
          className={`flex-1 h-full text-center rounded-full transition-all ${
            selected === 'today'
              ? 'bg-[#F4F4F4] text-black'
              : 'bg-transparent text-gray-500'
          }`}
        >
          오늘
        </button>
        <button
          type="button"
          onClick={() => setSelected('week')}
          className={`flex-1 h-full text-center rounded-full transition-all ${
            selected === 'week'
              ? 'bg-[#F4F4F4] text-black'
              : 'bg-transparent text-gray-500'
          }`}
        >
          주간
        </button>
      </div>
    </div>
  );
};

export default TodayWeekSwitcher;
