import React, { useState, useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Button from '../../../components/button/Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/onboarding/onboarding1_icon.svg';
import agreeBtn from '../../../assets/onboarding/agreeBtn.svg';
import agreeBtn_checked from '../../../assets/onboarding/agreeBtn_checked.svg';
import { div } from 'framer-motion/client';
import Header from '../../../components/header/Header';

interface FormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  agreement: boolean;
}

const UserPassword: React.FC<{
  register: UseFormRegister<FormData>;
  errors: any;
  getValues: (name: string) => any;
}> = ({ register, errors, getValues }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="w-[130px] font-[500] text-[12px]">비밀번호</div>
        <div className="w-full">
          <UserDataInput
            useFormMode="onChange"
            id="password"
            type={showPassword ? 'text' : 'password'}
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
      <div className="flex justify-between w-full items-center">
        <div className="w-[130px] font-[500] text-[12px]">비밀번호 확인</div>
        <div className="w-full">
          <UserDataInput
            useFormMode="onChange"
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            requiredMessage="비밀번호 확인은 필수입니다"
            validate={(value: string) =>
              value === getValues('password') || '비밀번호가 일치하지 않습니다.'
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
  register: UseFormRegister<FormData>;
  setValue: (name: keyof FormData, value: any) => void;
  errors: any;
}> = ({ register, setValue, errors }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBtnClick = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    setValue('agreement', newValue); // FormData 타입의 키를 사용
  };

  useEffect(() => {
    setValue('agreement', isChecked); // 초기 값 동기화
  }, [isChecked, setValue]);

  return (
    <div className="flex flex-col justify-between w-full mt-[20px]">
      <div className="flex items-center gap-[10px]">
        <input
          type="checkbox"
          id="agreement"
          {...register('agreement', {
            required: '개인정보 동의는 필수 항목입니다.',
          })}
          checked={isChecked}
          onChange={handleCheckBtnClick}
          className="hidden"
        />
        <label htmlFor="agreement" className="cursor-pointer">
          <img
            src={isChecked ? agreeBtn_checked : agreeBtn}
            alt="체크 아이콘"
            className="w-5 h-5"
          />
        </label>
        <span className="text-[12px] text-gray-400">
          회원가입과 동시에 개인정보 취급방침 및 이용약관에 동의하게 됩니다.
        </span>
      </div>
      {errors.agreement && (
        <p className="text-red-500 text-[14px] mt-2">
          {errors.agreement.message}
        </p>
      )}
    </div>
  );
};

const SignInComplete: React.FC<{ nickname: string }> = ({ nickname }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-[80px]">
      <div className="py-[50px]">
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

      <p className="text-gray_text">이제 건강한 당 관리 여정을 시작해볼까요?</p>

      <div className="flex flex-col w-full gap-[15px] pt-[80px]">
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
  const [isComplete, setIsComplete] = useState(false);
  const [nickname, setNickname] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    setNickname(data.nickname);
    setIsComplete(true);
  };

  if (isComplete) {
    return <SignInComplete nickname={nickname} />;
  }

  return (
    <div className="">
      <div className="mt-[25px] px-[24px]">
        <Header headerTitle="회원가입" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-col w-full px-[24px] gap-[20px] mt-[30px]">
          <div className="flex w-full items-center">
            <div className="w-[130px] font-[500] text-[12px]">닉네임</div>
            <div className="w-full">
              <UserDataInput
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                requiredMessage="닉네임은 필수 입력 항목입니다"
                pattern={{
                  value: /^[가-힣]{2,5}$/, // 한글 2~5자 허용
                  message: '2-5자 사이의 한글 닉네임을 생성해주세요',
                }}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="w-[130px] font-[500] text-[12px]">성별</div>
            <div className="w-full">
              <select
                className="w-full py-[15px] pl-[15px] border rounded-full text-[12px] text-[#909090] border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                {...register('gender', { required: '성별을 선택해주세요' })}
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="w-[130px] font-[500] text-[12px]">
              아이디 (이메일)
            </div>
            <div className="w-full">
              <UserDataInput
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                requiredMessage="이메일은 필수 입력 항목입니다"
                pattern={{
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다',
                }}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <UserPassword
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <AgreementCheckbox
            register={register}
            errors={errors}
            setValue={setValue}
          />
        </div>

        <div className="mt-[200px] mx-[24px]">
          <button
            type="submit" // form 안에 있는 button의 type이 submit이므로 이거 클릭하면 form태그의 onSubmit이 실행됨
            className={`w-full py-[18px] flex items-center justify-center rounded-full mb-[70px] bg-primary text-white ${
              isValid ? 'bg-primary text-white' : 'bg-gray_light text-gray_text'
            }`}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
