import React from 'react';
import { Outlet } from 'react-router-dom';
import left from '../../assets/chevron-left.png';
import { useNavigate } from 'react-router-dom';

interface AppTitleProps {
  leftButton?: boolean;
}

const AppTitle = (props: AppTitleProps) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
    // 브라우저의 History API 사용(브라우저 히스토리를 프로그래밍적으로 다룰 수 있는 Javascript API)
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-center relative'>
        {props.leftButton && (
          <button type="button" className='absolute left-0 pt-[18px] pl-[30px]'>
            <img
              src={left}
              alt="뒤로가기"
              className="w-[8px] h-[14px]"
              onClick={handleBackClick}
            />
          </button>
        )}

        <div className="font-agbalumo flex justify-center items-center pt-9 pb-6 text-primary text-xl font-bold">
          Sweet Balance
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AppTitle;
