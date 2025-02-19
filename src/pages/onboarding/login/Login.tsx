import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../../assets/onboarding/login_logo.svg';
import login_text from '../../../assets/onboarding/login_text.svg';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Button from '../../../components/button/Button';
import { useNavigate, Outlet } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginResponse, registerUser } from '../../../api/onboarding/Login';
import ApiManager from '../../../api/ApiManager';

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
    handleSubmit, // 폼 내의 모든 register된 필드의 값을 객체 형태(LoginFormInputs)로 반환
    register,
    formState: { isValid, errors },
    reset,
  } = useForm<LoginFormInputs>({ mode: 'onChange' });

  const onSubmit = (data: { userId: string; userPassword: string }) => {
    console.log('로그인 정보:', data);
    mutation.mutate({ userId: data.userId, userPassword: data.userPassword });
  };

  const queryClient = useQueryClient();
  // 캐시 관리, 자동 refetch, 요청 재시도, 데이터 동기화 등의 작업 수행 가능
  // main.tsx에서 new QueryClient()로 생성된 queryClient 인스턴스를
  // 하위 컴포넌트인 Login.tsx에서 useQueryClient()로 받아와 사용하는 것

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('registerUser request onSuccess', data);
      // 응답 데이터에서 access token을 로컬 스토리지에 저장
      if (data.data?.access) {
        localStorage.setItem('token', data.data.access); // 'token' 키로 저장
        ApiManager.defaults.headers.Authorization = `Bearer ${data.data.access}`;
      }
      queryClient.invalidateQueries({ queryKey: ['registerUser'] });

      // 네비게이션
      navigate('/home');
    },
    onError: (error) => {
      console.log('registerUser request failed: ', error);

      reset({
        userId: '',
        userPassword: '',
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // handleSubmit으로 폼 데이터 처리
      className={`flex flex-col items-center pt-[10px] pb-[10px] box-border`}
    >
      <div className={`flex flex-col gap-[13px] w-[calc(100%-48px)]`}>
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
      </div>

      <div
        className={`w-[calc(100%-48px)] px-[10px] pt-[5px] flex justify-between text-gray_text text-[12px] mt-[10px]`}
      >
        <p>비밀번호를 잊으셨나요?</p>
        <button
          className={`underline decoration-1 text-[#F0807F] text-[12px] mb-[75px] `}
          style={{ textUnderlineOffset: '3px' }}
          onClick={() => navigate('/forgot-password')}
        >
          비밀번호 재설정
        </button>
      </div>

      <Button
        content="로그인"
        bgColor="bg-primary"
        size="xl"
        disabled={!isValid}
        type="submit"
      />
    </form>
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
