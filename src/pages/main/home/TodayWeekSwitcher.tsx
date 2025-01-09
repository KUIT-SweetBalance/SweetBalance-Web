interface TodayWeekSwitcherProps {
  selected: 'today' | 'week';
  onChange: (view: 'today' | 'week') => void;
}

const TodayWeekSwitcher = (props: TodayWeekSwitcherProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-white border w-full h-10 justify-between items-center rounded-full">
        <button
          type="button"
          onClick={() => props.onChange('today')}
          className={`flex-1 h-full text-center rounded-full transition-all ${
            props.selected === 'today'
              ? 'bg-[#F4F4F4] text-black'
              : 'bg-transparent text-gray-500'
          }`}
        >
          오늘
        </button>
        <button
          type="button"
          onClick={() => props.onChange('week')}
          className={`flex-1 h-full text-center rounded-full transition-all ${
            props.selected === 'week'
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
