import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false); // 스플래시 화면의 사라짐 상태

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1100); // 1000 후 fadeOut 시작

    const navigateTimer = setTimeout(() => {
      navigate('/auth-selection');
    }, 1550); // 페이드아웃 애니메이션 후 200ms 정도 여유

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center bg-primary text-white transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`} // fadeOut 상태에 따라 opacity 조절
    >
      <div className={`font-stylescript text-[65px] text-white font-medium`}>
        Sweet Balance
      </div>
    </div>
  );
};

export default Splash;
