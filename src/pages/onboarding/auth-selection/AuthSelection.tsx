import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import onboarding1_logo from '../../../assets/onboarding/onboarding1_logo.svg';
import onboarding1_icon from '../../../assets/onboarding/onboarding1_icon.svg';
import Button from '../../../components/button/Button';
import RedirectButton from '../Kakaotalk/LoginButton';

const Logo = () => {
  return (
    <div className={`flex items-start justify-center pt-0`}>
      <img src={onboarding1_logo} alt="Sweet Balance" />
    </div>
  );
};

const Icon = () => {
  return (
    <motion.div
      className="flex justify-center"
      animate={{ y: [0, -15, 0] }} // 사선 이동 효과 추가
      transition={{
        duration: 3.5, // 천천히 떠오르는 효과
        repeat: Infinity, // 무한 반복
        ease: 'easeInOut', // 부드러운 움직임
      }}
    >
      <img src={onboarding1_icon} alt="onboarding1_icon" />
    </motion.div>
  );
};

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <div className={`flex justify-center py-2.5`}>
      <Button
        content="간편하게 시작하기"
        bgColor="bg-primary"
        size="xl"
        onClick={() => {
          navigate('/sign-in');
        }}
      ></Button>
    </div>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col justify-center items-center pt-6 gap-2.5`}>
      <div className={``}>이미 계정이 있으신가요?</div>
      <button
        className={`text-gray_text underline decoration-1`}
        style={{ textUnderlineOffset: '3px' }}
        onClick={() => navigate('/login')}
      >
        로그인하기
      </button>
    </div>
  );
};

const AuthSelection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300); // 300ms 후 페이드인 시작 (Splash가 완전히 사라지기 전에 시작)
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <Logo />
      <Icon />
      <SignInButton />
      <div className={`flex items-center gap-4 py-5 px-6`}>
        <hr className={`flex-grow border-gray-300`} />
        <span className={`text-sm text-gray-500`}>또는</span>
        <hr className={`flex-grow border-gray-300`} />
      </div>
      <div
        className={`flex flex-col items-center w-[100%-(50px)] m-0 p-0 box-border`}
      >
        <RedirectButton />
      </div>
      <LoginButton />
    </div>
  );
};

export default AuthSelection;
