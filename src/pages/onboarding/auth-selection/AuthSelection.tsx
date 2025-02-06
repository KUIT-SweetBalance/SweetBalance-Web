import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import onboarding1_logo from '../../../assets/onboarding/onboarding1_logo.svg';
import onboarding1_icon from '../../../assets/onboarding/onboarding1_icon.svg';
import Button from '../../../components/button/Button';
import RedirectButton from '../Kakaotalk/LoginButton';

const Logo = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center mt-[3.87vh] pt-[2.35vh] pb-[2.35vh] gap-[2.35vh]`}
    >
      {/* <img src={onboarding1_logo} alt="Sweet Balance" /> */}
      <div
        className={`font-stylescript text-[7.5vh] text-primary font-medium leading-[7.5vh]`}
      >
        Sweet Balance
      </div>
      <div className={`text-primary text-[16px]`}>
        스마트한 당 관리, 지금 바로 시작하세요!
      </div>
    </div>
  );
};

const Icon = () => {
  return (
    <motion.div
      className="flex justify-center "
      animate={{ y: [0, -15, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
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
    <div
      className={`flex flex-col justify-center items-center pt-[2.35vh] pb-[8.57vh] gap-[1.18vh]`}
    >
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
      <div className={`flex items-center gap-4 px-[6.11vw] py-[2.35vh]`}>
        <hr className={`flex-grow border-gray-300`} />
        <span className={`text-sm text-gray-500`}>또는</span>
        <hr className={`flex-grow border-gray-300`} />
      </div>
      <div className={`flex flex-col items-center py-[2.35vh]`}>
        <RedirectButton />
      </div>
      <LoginButton />
    </div>
  );
};

export default AuthSelection;
