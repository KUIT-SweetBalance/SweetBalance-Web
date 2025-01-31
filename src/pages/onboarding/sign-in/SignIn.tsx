import React, { useState } from 'react';
import sign_in_step1 from '../../../assets/onboarding/sign_in_step1.svg';
import sign_in_step2 from '../../../assets/onboarding/sign_in_step2.svg';
import sign_in_step3 from '../../../assets/onboarding/sign_in_step3.svg';
import sign_in_step4 from '../../../assets/onboarding/sign_in_step4.svg';
import UserNickname from '../UserNickname';
import UserPassword from '../UserPassword';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/onboarding/onboarding1_icon.svg';

const StepBar: React.FC<{ step: number }> = ({ step }) => {
  const stepText =
    step === 4 ? (
      <p className="text-primary font-light">완료!</p>
    ) : (
      <p className="text-gray_text font-light">{step} / 4단계</p>
    );
  const stepImages = [
    sign_in_step1,
    sign_in_step2,
    sign_in_step3,
    sign_in_step4,
  ];
  return (
    <div className="pt-[4vh] flex flex-col justify-center items-center gap-[10px]">
      <img src={stepImages[step - 1]} alt={`Step ${step}`} />
      {stepText}
    </div>
  );
};

const SignIn = () => {
  const [step, setStep] = useState(1); // 현재 단계
  const [nickname, setNickname] = useState(''); // 닉네임
  const [gender, setGender] = useState(''); // 성별

  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col items-center  ">
      <StepBar step={step} />

      <div className={`w-full`}>
        {step === 1 && (
          <div className={`w-full flex flex-col items-center`}>
            <div
              className={`w-full pt-[20px] mt-[15px] flex flex-col items-center justify-center gap-[15px]`}
            >
              <p className={`text-[25px] font-bold`}>
                함께할 닉네임을 정해주세요!
              </p>
              <p className={`text-gray_text font-light`}>
                언제든지 변경 가능해요
              </p>
            </div>
            <div
              className={` flex flex-col justify-center items-center pt-[135px]`}
            >
              <UserNickname onNext={handleNext} />
            </div>
          </div>
        )}
        {step === 2 && <UserPassword onNext={handleNext} />}
        {step === 3 && (
          <div className="w-full flex flex-col items-center">
            <div
              className={`w-full flex flex-col gap-[10px] items-center pt-[10vh]`}
            >
              <p className="text-[25px]">성별을 선택해주세요</p>
              <p className="text-gray_text">언제든지 변경 가능해요</p>
            </div>
            <div className="flex pt-[15vh] pb-[30vh] gap-4">
              <button
                className={`w-[30vw] h-[7vh] py-2 rounded-full border ${
                  gender === '여성'
                    ? 'bg-[#F0807F]/20  border-solid border-[#F0807F] text-primary'
                    : 'bg-white text-gray_text border-gray_text'
                }`}
                onClick={() => setGender('여성')}
              >
                여성
              </button>
              <button
                className={`w-[30vw] h-[7vh] py-2 rounded-full border ${
                  gender === '남성'
                    ? 'bg-[#F0807F]/20  border-solid border-[#F0807F] text-primary'
                    : 'bg-white text-gray_text border-gray_text'
                }`}
                onClick={() => setGender('남성')}
              >
                남성
              </button>
            </div>
            <Button
              content="완료"
              bgColor="bg-primary"
              size="xl"
              disabled={!gender}
              onClick={handleNext}
            />
          </div>
        )}
        {step === 4 && (
          <div className={`text-center`}>
            <div className={`pt-[5.8vh] pb-[7.3vh]`}>
              <h1 className="text-[20px]">회원가입 완료</h1>
              <p className="text-[30px]">반가워요, {nickname}님!</p>
            </div>
            <img src={icon} alt="icon" />
            <p className={`text-gray_text `}>
              이제 건강한 당 관리 여정을 시작해볼까요?
            </p>
            <div className={`flex flex-col w-full gap-[15px] pt-[8vh]`}>
              <Button
                content="당 기록하러 가기"
                bgColor="bg-primary"
                size="xl"
                onClick={() => navigate('/home')}
              />
              <Button
                content="나중에 기록하기"
                bgColor="bg-white"
                size="xl"
                onClick={() => navigate('/login')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
