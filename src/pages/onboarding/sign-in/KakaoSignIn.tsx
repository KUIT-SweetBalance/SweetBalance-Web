import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Button from '../../../components/button/Button';
import icon from '../../../assets/onboarding/onboarding1_icon.svg';
import ellipse_gray from '../../../assets/onboarding/ellipse_gray.svg';
import ellipse_primary from '../../../assets/onboarding/ellipse_primary.svg';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { ChangeUserInfo,changeInfomation } from '../../../api/mypage/revise/Mypagerevise';
const StepBar: React.FC<{
  step: number;
  nicknameValid: boolean;
  genderSelected: boolean;
}> = ({ step, nicknameValid, genderSelected }) => {
  return (
    <div className={` pt-[4vh] pb-[4vh]`}>
      <div className={`flex gap-[50px]`}>
        <div className={`flex gap-[10px]`}>
          <img src={nicknameValid ? ellipse_primary : ellipse_gray} alt="" />
          <p className={nicknameValid ? `text-primary` : `text-gray_text`}>
            닉네임
          </p>
        </div>
        <div className={`flex gap-[10px]`}>
          <img src={genderSelected ? ellipse_primary : ellipse_gray} alt="" />
          <p className={genderSelected ? `text-primary` : `text-gray_text`}>
            성별
          </p>
        </div>
      </div>
    </div>
  );
};

const UserNicknameForm: React.FC<{
  step: number;
  handleNext: () => void;
  setNickname: (nickname: string) => void;
  setNicknameValid: (isValid: boolean) => void; // 추가
}> = ({ step, handleNext, setNickname, setNicknameValid }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const nickname = watch('nickname', '');

  useEffect(() => {
    const regex = /^[가-힣]{2,5}$/;
    const isValid = regex.test(nickname);
    setNicknameValid(isValid); // 닉네임 유효성 업데이트
    setNickname(nickname);
  }, [nickname, setNickname, setNicknameValid]);

  return (
    <>
      {step === 1 && (
        <div className={`flex flex-col items-center`}>
          <div
            className={`w-[calc(100%-12.22vw)] flex flex-col items-center border rounded-[20px] shadow-lg pt-[3.52vh] pb-[27vh] my-[3.52vh]`}
          >
            <div
              className={`flex flex-col items-center justify-center gap-[15px] mb-[15.82vh]`}
            >
              <p className={`text-[25px] font-bold`}>
                함께할 닉네임을 정해주세요!
              </p>
              <p className={`text-gray_text font-light`}>
                언제든지 변경 가능해요
              </p>
            </div>

            <div className={`flex flex-col w-full justify-center items-center`}>
              <UserDataInput
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                requiredMessage="닉네임은 필수 입력 항목입니다"
                pattern={{
                  value: /^[가-힣]{2,5}$/,
                  message: '5자 내로 작성해주세요',
                }}
                register={register}
                errors={errors}
                position="center"
              />
            </div>
          </div>

          <div className={`w-full py-[3vh] `}>
            <Button
              content="다음"
              bgColor="bg-primary"
              size="xl"
              onClick={handleNext}
              disabled={!nickname.match(/^[가-힣]{2,5}$/)}
            />
          </div>
        </div>
      )}
    </>
  );
};

const UserGenderForm: React.FC<{
  step: number;
  handleNext: () => void;
  gender: string;
  setGender: (gender: string) => void;
  setGenderSelected: (selected: boolean) => void; // 추가
}> = ({ step, handleNext, gender, setGender, setGenderSelected }) => {
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setGenderSelected(true); // 성별 선택 상태 업데이트
  };

  return (
    <>
      {step === 2 && (
        <div className="w-full flex flex-col items-center">
          <div
            className={`w-[calc(100%-12.22vw)] flex flex-col items-center border rounded-[20px] shadow-lg pt-[3.52vh] pb-[30.64vh] my-[3.52vh]`}
          >
            <div
              className={`flex flex-col items-center justify-center gap-[15px] mb-[15.82vh]`}
            >
              <p className="text-[25px] font-bold">성별을 선택해주세요</p>
              <p className="text-gray_text font-light">
                언제든지 변경 가능해요
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className={`w-[30vw] h-[6.52vh] rounded-full border ${
                  gender === '여성'
                    ? 'bg-[#F0807F]/20  border-solid border-[#F0807F] text-primary'
                    : 'bg-white text-gray_text border-gray_text'
                }`}
                onClick={() => handleGenderSelect('여성')}
              >
                여성
              </button>
              <button
                className={`w-[30vw] h-[6.52vh]  rounded-full border ${
                  gender === '남성'
                    ? 'bg-[#F0807F]/20  border-solid border-[#F0807F] text-primary'
                    : 'bg-white text-gray_text border-gray_text'
                }`}
                onClick={() => handleGenderSelect('남성')}
              >
                남성
              </button>
            </div>
          </div>
          <div className={`w-full py-[3vh] `}>
            <Button
              content="완료"
              bgColor="bg-primary"
              size="xl"
              disabled={!gender}
              onClick={handleNext}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SignInComplete: React.FC<{
  step: number;
  nickname: string;
}> = ({ step, nickname }) => {
  const navigate = useNavigate();

  return (
    <>
      {step === 3 && (
        <div className={`text-center`}>
          <div className={`pt-[5.8vh] pb-[7.3vh]`}>
            <h1 className="text-[20px]">회원가입 완료</h1>
            <p className="text-[30px] font-bold">반가워요, {nickname}님!</p>
          </div>
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img src={icon} alt="onboarding1_icon" />
          </motion.div>
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
    </>
  );
};

const KakaoSignIn:React.FC = () => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false); // 닉네임 유효성 상태 추가
  const [gender, setGender] = useState('');
  const [genderSelected, setGenderSelected] = useState(false); // 성별 선택 상태 추가
const navigate = useNavigate()
const queryClient = useQueryClient();
  
const UserInfoMutation = useMutation({
  mutationFn: ChangeUserInfo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["UserInfo"] });
  },
  onError: (error) => {
    console.error("유저 정보 수정 실패 ❌:", error);
  },
});
  const handleNext = () => {
   
    if (step < 2) setStep((prev) => prev + 1);
    else if(step===2){
      const gen = gender==="남성"?"MALE":"FEMALE"
       const changeInfo:changeInfomation = {
            nickname,
            gender:gen ,
          };
          UserInfoMutation.mutate(changeInfo, {
            onSuccess: () => {
              navigate('/home'); // 성공 시 이동
            }
          });
    }
  };
  
  return (
    <div className={`w-full flex flex-col items-center`}>
      {step !== 3 && (
        <StepBar
          step={step}
          nicknameValid={nicknameValid}
          genderSelected={genderSelected}
        />
      )}
      <div className={`w-full`}>
        <UserNicknameForm
          step={step}
          handleNext={handleNext}
          setNickname={setNickname}
          setNicknameValid={setNicknameValid}
        />
        <UserGenderForm
          step={step}
          handleNext={handleNext}
          gender={gender}
          setGender={setGender}
          setGenderSelected={setGenderSelected}
        />
        <SignInComplete step={step} nickname={nickname} />
      </div>
    </div>
  );
};

export default KakaoSignIn;
