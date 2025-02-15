import React, { useState, useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Button from '../../../components/button/Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/onboarding/onboarding1_icon.svg';
import agreeBtn from '../../../assets/onboarding/agreeBtn.svg';
import agreeBtn_checked from '../../../assets/onboarding/agreeBtn_checked.svg';

interface FormData {
  nickname: string;
  email: string;
  password: string;
  profileIntro: string;
  searchQuery: string;
  gender: string;
  agreement: boolean;
}

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
      <div className="py-[2.82vh] px-[2.35vh] flex justify-between">
        <div className="my-auto text-[12px]">비밀번호</div>
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
      <div className="py-[2.82vh] px-[2.35vh] flex justify-between">
        <div className="my-auto text-[12px]">비밀번호 확인</div>
        <div className="w-[65.91vw] h-[5.16vh]">
          <UserDataInput
            useFormMode="onChange"
            id="userPasswordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
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

const AgreementCheckbox: React.FC<{
  // 개인정보 수집 동의
  register: UseFormRegister<FormData>;
  errors: any;
}> = ({ register, errors }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col px-[2.35vh] gap-[10px] justify-center">
      <div className={`flex items-center gap-[10px]`}>
        <input
          type="checkbox"
          id="agreement"
          {...register('agreement', {
            required: '개인정보 동의는 필수입니다.',
          })}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="hidden"
        />

        {/* SVG를 체크박스처럼 활용 */}
        <label htmlFor="agreement" className="cursor-pointer">
          <img
            src={isChecked ? agreeBtn : agreeBtn_checked}
            alt="체크 아이콘"
            className="w-5 h-5"
          />
        </label>

        <span className="text-[11px] text-gray-400">
          회원가입과 동시에 개인정보 취급방침 및 이용약관에 동의하게 됩니다.
        </span>
      </div>

      {/* 에러 메시지 */}
      {errors.agreement && (
        <p className="text-red-500 text-xs mt-1">{errors.agreement.message}</p>
      )}
    </div>
  );
};

const SignInComplete: React.FC<{ nickname: string }> = ({ nickname }) => {
  // 회원가입 완료 후 화면 전환
  const navigate = useNavigate();

  return (
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
      <p className={`text-gray_text`}>
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
  );
};

const SignIn = () => {
  // 메인 페이지
  const [isComplete, setIsComplete] = useState(false); // 화면 전환 상태
  const [nickname, setNickname] = useState(''); // 닉네임 상태 저장

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    setNickname(data.nickname); // 닉네임 상태 저장
    setIsComplete(true); // SignInComplete 화면으로 전환
  };

  if (isComplete) {
    return <SignInComplete nickname={nickname} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col w-full max-w-md mx-auto`}
    >
      <div className={`py-[2.82vh] px-[2.35vh] flex justify-between`}>
        <div className={`my-auto text-[12px]`}>닉네임</div>
        <div className={`w-[65.91vw] h-[5.16vh]`}>
          <UserDataInput
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            requiredMessage="닉네임을 입력해야 합니다."
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className={`py-[2.82vh] px-[2.35vh] flex justify-between`}>
        <div className={`my-auto text-[12px]`}>성별</div>
        <div className={`w-[65.91vw] h-[5.16vh]`}>
          <select
            className={`
              w-full
              h-[6.52vh]
              p-3 
              border 
              rounded-full 
              text-[12px]
              text-[#909090] 
              placeholder-gray-400
              focus:outline-none 
              focus:ring-1 
              focus:ring-primary 
              focus:placeholder-transparent
              border-gray-300
              `}
            {...register('gender', { required: '성별을 선택해야 합니다.' })}
          >
            <option value="">성별을 선택해 주세요.</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          {errors.gender && (
            <p className="mt-2 text-sm text-red-500 border-red-300 focus:ring-red-400">
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>

      <div className={`py-[2.82vh] px-[2.35vh] flex justify-between`}>
        <div className={`my-auto text-[12px]`}>아이디 (이메일)</div>
        <div className={`w-[65.91vw] h-[5.16vh]`}>
          <UserDataInput
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            requiredMessage="이메일을 입력해야 합니다."
            pattern={{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '입력된 아이디(이메일)는 잘못된 형식입니다.',
            }}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <UserPassword />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AgreementCheckbox register={register} errors={errors} />
      </form>

      <div className="mt-6 flex justify-center">
        <Button
          content="다음"
          bgColor="bg-primary"
          size="xl"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default SignIn;
