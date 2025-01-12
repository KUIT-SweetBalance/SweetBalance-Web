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
          className={`flex-1 h-full text-center text-[14px] rounded-full transition-all ${
            props.selected === 'today'
              ? 'bg-primary text-white'
              : 'bg-transparent text-primary'
          }`}
        >
          오늘
        </button>
        <button
          type="button"
          onClick={() => props.onChange('week')}
          className={`flex-1 h-full text-center text-[14px] rounded-full transition-all ${
            props.selected === 'week'
              ? 'bg-primary text-white'
              : 'bg-transparent text-primary'
          }`}
        >
          주간
        </button>
      </div>
    </div>
  );
};

export default TodayWeekSwitcher;
