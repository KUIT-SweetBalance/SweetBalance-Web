import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../../assets/onboarding/login_logo.svg';
import login_text from '../../../assets/onboarding/login_text.svg';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Button from '../../../components/button/Button';
import { useNavigate, Outlet } from 'react-router-dom';

interface LoginFormInputs {
  userId: string;
  userPassword: string;
}

const LoginLogo = () => {
  return (
    <div className={`box-border border-none`}>
      <div
        className={`bg-primary flex justify-center items-center flex-col w-[100%] gap-[20px] pt-[50px] pb-[90px]`}
      >
        <div className={`font-stylescript text-[65px] text-white font-medium`}>
          Sweet Balance
        </div>{' '}
        <p className={`text-white text-sm font-light`}>
          스마트한 당 관리, 지금 바로 시작하세요!
        </p>
      </div>

      <div
        className={`flex flex-col justify-center items-center  bg-white w-full rounded-tr-[20px] rounded-tl-[20px] -mt-[30px] pt-[40px] pb-[40px]`}
      >
        <div
          className={`font-stylescript text-[45px] text-primary font-medium`}
        >
          Log In
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm<LoginFormInputs>({ mode: 'onChange' });

  const onSubmit = (data: { userId: string; userPassword: string }) => {
    console.log('로그인 정보:', data);
  };
  return (
    <div
      className={`flex flex-col items-center pt-[10px] pb-[10px] box-border`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-[13px] w-[calc(100%-48px)]`}
      >
        <UserDataInput
          id="userId"
          type="text"
          placeholder="아이디"
          requiredMessage="아이디는 필수 입력 항목입니다"
          position="left"
          register={register}
          errors={errors}
        />
        <UserDataInput
          id="userPassword"
          type="password"
          placeholder="비밀번호"
          requiredMessage="비밀번호는 필수 입력 항목입니다"
          position="left"
          register={register}
          errors={errors}
        />
      </form>

      <div
        className={`w-[calc(100%-48px)] flex  gap-[116px] text-gray_text text-[12px] mt-[10px]`}
      >
        <p>비밀번호를 잊으셨나요?</p>
        <button
          className={`underline decoration-1 text-[#F0807F] text-[12px] mb-[75px] `}
          style={{ textUnderlineOffset: '3px' }}
          onClick={() => navigate('/forgot-password')}
        >
          비밀번호 재발급
        </button>
      </div>

      <Button
        content="로그인"
        bgColor="bg-primary"
        size="xl"
        disabled={!isValid}
        onClick={() => navigate('/home')}
      />
    </div>
  );
};

const SignUpButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col justify-center items-center pb-[70px] mt-[88px] gap-[10px] text-[16px]`}
    >
      <div className={``}>앗, 회원이 아니신가요?</div>
      <button
        className={`underline decoration-1 text-[#F0807F] font-light `}
        style={{ textUnderlineOffset: '3px' }}
        onClick={() => navigate('/sign-in')}
      >
        회원가입하기
      </button>
    </div>
  );
};

const Login = () => {
  return (
    <div className={`bg-white flex flex-col justify-center gap-0 `}>
      <LoginLogo />
      <LoginForm />
      <SignUpButton />
    </div>
  );
};

export default Login;
