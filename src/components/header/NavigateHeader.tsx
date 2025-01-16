import React from 'react';
import left from '../../assets/chevron-left.png';

interface NavigateHeaderProps {
  headerTitle: string;
  confirmButton?: string;
}

const NavigateHeader = (props: NavigateHeaderProps) => {
  return (
    <div className="flex w-full px-[10px] justify-center justify-between">
      <button type="button" className='w-[25px]'>
        <img src={left} alt="뒤로가기" className="w-[8px] h-[14px]" />
      </button>

      <div className="text-[18px] font-medium">{props.headerTitle}</div>

      <button type="button" className="w-[25px] text-[14px] font-medium text-primary">
        {props.confirmButton}
      </button>
    </div>
  );
};

export default NavigateHeader;
