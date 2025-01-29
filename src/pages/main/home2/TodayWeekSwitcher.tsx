import React from 'react';

interface TodayWeekSwitcherProps {
  selected: 'today' | 'week';
  onChange: (view: 'today' | 'week') => void;
}

const TodayWeekSwitcher = (props: TodayWeekSwitcherProps) => {
  return (
    <div className="flex bg-primary px-[19px] gap-[20px] pt-[50px]">
      <button
        type="button"
        onClick={() => props.onChange('today')}
        className={`flex-1 p-[10px] text-white text-[14px] text-start border-t border-t-white ${
          props.selected === 'week' ? 'text-opacity-50 border-opacity-50' : ''
        }`}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => props.onChange('week')}
        className={`flex-1 p-[10px] text-white text-[14px] text-start border-t border-t-white ${
          props.selected === 'today' ? 'text-opacity-50 border-opacity-50' : ''
        }`}
      >
        Weekly
      </button>
    </div>
  );
};

export default TodayWeekSwitcher;
