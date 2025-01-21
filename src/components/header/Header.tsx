import React from 'react';
import { useNavigate } from 'react-router-dom';
import left from '../../assets/chevron-left.png';

interface HeaderProps {
  headerTitle: string;
  confirmButton?: string;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
    // 브라우저의 History API 사용(브라우저 히스토리를 프로그래밍적으로 다룰 수 있는 Javascript API)
  };

  return (
    <div className="flex w-full px-[10px] justify-center justify-between">
      <button type="button" className="w-[25px]">
        <img
          src={left}
          alt="뒤로가기"
          className="w-[8px] h-[14px]"
          onClick={handleBackClick}
        />
      </button>

      <div className="text-[18px] font-medium">{props.headerTitle}</div>

      <button
        type="button"
        className="w-[25px] text-[14px] font-medium text-primary"
      >
        {props.confirmButton}
      </button>
    </div>
  );
};

export default Header;
