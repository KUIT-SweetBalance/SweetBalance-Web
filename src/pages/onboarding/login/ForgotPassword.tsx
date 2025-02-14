import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import backarrow from '../../../assets/onboarding/backarrow.svg';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Modal from '../../../components/modal/Modal';

const TopBar = () => {
  return (
    <div className="flex items-center py-[2.35vh] gap-[26.21vw]">
      <button className="pl-[7.89vw]">
        <img src={backarrow}></img>
      </button>
      <p className="text-[18px]">비밀번호 재설정</p>
    </div>
  );
};
const Callout = () => {
  return (
    <div
      className={`border flex flex-col justify-center gap-[0.59vh] mx-[3.56vw] my-[1.17vh] border-gray_light px-[10px] py-[5.9vw] rounded-[20px]`}
    >
      <p className={`text-[12px]`}>이메일 정보로 재설정</p>
      <p className={`text-[12px] text-gray_text`}>
        가입한 스윗밸런스 계정의 이메일 정보로 비밀번호를 재설정할 수 있어요
      </p>
    </div>
  );
};

const EmailVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const emailInput = watch('email');
  const verificationCode = watch('code');
  const isCodeEntered = verificationCode && verificationCode.length > 0;

  const handleVerifyEmail = (data: any) => {
    setEmail(data.email);
    setIsModalOpen(true);
  };

  const handleConfirmCode = (data: any) => {
    if (data.code === '1234') {
      // 예제 코드 ->  서버와 검증 필요
      setIsCodeVerified(true);
    } else {
      alert('인증번호가 틀렸습니다. 다시 입력해주세요.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit(handleVerifyEmail)}
        className="flex w-full justify-between  box-border  text-[12px]  px-[10px] py-[1.7vh] "
      >
        {/* 이메일 입력 필드 */}
        <div className="my-auto text-[12px] pr-[14px]">아이디 (이메일)</div>
        <div className="w-[45.23vw]">
          <UserDataInput
            id="email"
            label=""
            type="email"
            placeholder=""
            requiredMessage="이메일을 입력하세요."
            register={register}
            errors={errors}
          />
        </div>

        {/* 인증하기 버튼 -> 이메일 입력 시 활성화 */}
        <button
          type="submit"
          onClick={() => setIsModalOpen(true)}
          className={`my-auto w-[18.67vw] h-[5.16vh] text-white rounded-[22px] text-[12px] ${emailInput ? 'bg-[#F0807F]' : 'bg-gray-300 '}`}
          disabled={!emailInput}
        >
          인증하기
        </button>
      </form>

      {/* 인증번호 입력 필드 (항상 표시) */}
      <form
        onSubmit={handleSubmit(handleConfirmCode)}
        className="flex w-full justify-between  box-border  text-[12px]  px-[10px] py-[1.7vh]"
      >
        <div className="text-transparent pr-[14px]">아이디 (이메일)</div>
        <div className="w-[45.23vw]">
          <UserDataInput
            id="code"
            label=""
            type="text"
            placeholder=""
            requiredMessage="인증번호를 입력하세요."
            register={register}
            errors={errors}
          />
        </div>

        {/* 확인 버튼 (인증번호 입력 시 활성화) */}
        <button
          type="submit"
          className={`my-auto w-[18.67vw] h-[5.16vh] rounded-[22px] text-white text-[12px] ${isCodeEntered ? 'bg-[#F0807F]  ' : 'bg-gray-300 '}`}
          disabled={!isCodeEntered}
        >
          확인
        </button>
      </form>

      {/* 모달 */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} email={email} />
      )}
    </div>
  );
};

const UserPassword = () => {
  // 비밀번호 입력
  const {
    watch,
    getValues,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordValue = watch('userPassword');
  const passwordConfirmValue = watch('userPasswordConfirm');

  useEffect(() => {
    console.log('비밀번호:', passwordValue);
    console.log('비밀번호 확인:', passwordConfirmValue);
  }, [passwordValue, passwordConfirmValue]);

  return (
    <>
      <div className="py-[2vh] px-[2.35vh] flex justify-between">
        <div className="my-auto text-[12px] pr-[32px]">새 비밀번호</div>
        <div className="w-[65.91vw] h-[5.16vh]">
          <UserDataInput
            useFormMode="onChange"
            id="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            requiredMessage="비밀번호는 필수 입력 항목입니다"
            pattern={{
              value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/,
              message:
                '숫자와 영문 소문자로 이루어진 6-12자 비밀번호를 생성해주세요',
            }}
            position="left"
            register={register}
            errors={errors}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
        </div>
      </div>
      <div className=" px-[2.35vh] flex justify-between">
        <div className="my-auto text-[12px]  pr-[32px]"></div>

        <div className="w-[65.91vw] py-[3vh] box-border">
          <UserDataInput
            useFormMode="onChange"
            id="userPasswordConfirm"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            requiredMessage="비밀번호는 필수 입력 항목입니다"
            validate={(value: string) =>
              value === getValues('userPassword') ||
              '비밀번호가 일치하지 않습니다.'
            }
            position="left"
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </>
  );
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopBar />
      <Callout />
      <EmailVerification />
      <UserPassword />
      <div className="pt-[25vh]">
        <Button
          size="xl"
          bgColor="bg-primary"
          content="로그인하러 가기"
          onClick={() => navigate('/login')}
        />
      </div>
    </>
  );
};

export default ForgotPassword;
