import React, { useState, useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import Button from '../../../components/button/Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/onboarding/onboarding1_icon.svg';
import agreeBtn from '../../../assets/onboarding/agreeBtn.svg';
import agreeBtn_checked from '../../../assets/onboarding/agreeBtn_checked.svg';
import { div, p } from 'framer-motion/client';
import Header from '../../../components/header/Header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkEmailAvailability,
  checkVerificationCode,
  sendVerificationCode,
  signUp,
} from '../../../api/onboarding/SignIn';
import Modal from '../../custom/custom-main/Modal';
import OnboardingModal from '../../../components/modal/Modal';

interface FormData {
  nickname: string;
  email: string;
  verificationCode: string;
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
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  // 이메일 형식이 올바를 때 '인증하기' 버튼 disable 해제
  const emailValue = watch('email'); // 이메일 필드값 실시간 감지
  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue); // 이메일 정규식 검사

  // 인증번호 형식이 올바를 때 '확인' 버튼 disable 해제
  const verificationCodeValue = watch('verificationCode');
  const isVerificationCodeFormatValid = /^.{6}$/.test(verificationCodeValue);

  // 비밀번호 보여주기/가리기
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 성별값 가져오기
  const genderValue = watch('gender'); // 선택된 성별 값을 가져옴

  // 닉네임 가져오기
  const nicknameValue = watch('nickname');

  // userPassword 필드값 실시간 추적(콘솔 확인용)
  const passwordValue = watch('password'); // userPassword 값 추적
  const passwordConfirmValue = watch('passwordConfirm'); // userPasswordConfirm 값 추적
  // useEffect(() => {
  //   console.log('비밀번호:', passwordValue);
  //   console.log('비밀번호 확인:', passwordConfirmValue);
  // }, [passwordValue, passwordConfirmValue]);

  const queryClient = useQueryClient();

  // 인증번호 확인
  const checkVeriCodeMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      checkVerificationCode(email, code),
    onSuccess: (data) => {
      console.log('checkVeriCodeMutation request onSuccess', data);
      queryClient.invalidateQueries({ queryKey: ['checkVeriCodeMutation'] });
    },
    onError: (error) => {
      console.log('checkVeriCodeMutation request onError: ', error);
    },
  });

  // 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState('');

  // 인증번호 전송
  const sendVeriCodeMutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: (data) => {
      console.log('sendVerificationCode request onSuccess', data);
      queryClient.invalidateQueries({ queryKey: ['sendVerificationCode'] });
    },
    onError: (error) => {
      setModalContents('일치하지 않는 인증번호입니다');
      setIsModalOpen(true);
      console.log('sendVerificationCode request onError: ', error);
    },
  });

  // 이메일 중복인증

  // 이메일 중복확인 요청의 응답에서 사용 가능한 이메일인지 확인
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null,
  );
  const emailMutation = useMutation({
    mutationFn: checkEmailAvailability,
    onSuccess: (data) => {
      console.log('checkEmailAvailability request onSuccess', data);
      queryClient.invalidateQueries({ queryKey: ['checkEmailAvailability'] });
      if (data.code === 0) {
        console.log('인증번호가 입력하신 이메일로 전송되었습니다');
        setModalContents('인증번호가 입력하신 이메일로 전송되었습니다');
        setIsModalOpen(true);
        setIsEmailAvailable(true);
        sendVeriCodeMutation.mutate(emailValue);
      } else {
        console.log(data.message);
        setModalContents(data.message);
        setIsModalOpen(true);
        setIsEmailAvailable(false);
      }
    },
    onError: (error) => {
      console.log('checkEmailAvailability request onError: ', error);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({
      email,
      password,
      nickname,
      gender,
    }: {
      email: string;
      password: string;
      nickname: string;
      gender: string;
    }) => signUp(email, password, nickname, gender),
    onSuccess: (data) => {
      console.log('signUp request onSuccess', data);
      queryClient.invalidateQueries({ queryKey: ['signUp'] });
      setIsComplete(true);
    },
    onError: (error) => {
      console.log('signUp request onError: ', error);
    },
  });

  const handleVerifyEmailClick = () => {
    emailMutation.mutate(emailValue);
  };

  const handleCheckVerificationCodeClick = () => {
    checkVeriCodeMutation.mutate({
      email: emailValue,
      code: verificationCodeValue,
    });
  };

  const onSubmit = (data: FormData) => {
    setNickname(data.nickname);
    signUpMutation.mutate({
      email: emailValue,
      password: passwordValue,
      nickname: nicknameValue,
      gender: genderValue,
    });
    // setIsComplete(true);
  };

  if (isComplete) {
    return <SignInComplete nickname={nickname} />;
  }

  return (
    <div className="">
      <div className="mt-[25px] px-[24px] mb-[30px]">
        <Header headerTitle="회원가입" />
      </div>

      <div className="flex w-full gap-[30px] px-[24px]">
        <div className="shrink-0 pt-[15px] flex flex-col gap-[60px] text-[12px] font-[500]">
          <p>닉네임</p>
          <p>성별</p>
          <p>아이디(이메일)</p>
          <p>&nbsp;</p>
          <p>비밀번호</p>
          <p>비밀번호 확인</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-[27px]"
        >
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

          <div className="w-full">
            <select
              className="w-full py-[15px] pl-[15px] border rounded-full text-[12px] text-[#909090] border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              {...register('gender', { required: '성별을 선택해주세요' })}
            >
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="w-full flex shrink-0">
              <div className="w-full mr-[10px]">
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
              <div>
                <button
                  type="button"
                  className={`p-[15px] text-[12px] font-[500] whitespace-nowrap rounded-full 
                  ${isEmailFormatValid ? 'bg-alert text-white' : 'bg-gray_light text-gray_text cursor-not-allowed'}`}
                  onClick={handleVerifyEmailClick}
                  disabled={!isEmailFormatValid}
                >
                  인증하기
                </button>
              </div>
            </div>
            {/* {isEmailAvailable !== null && emailValue.length > 0 && (
              <p className="text-[12px] text-alert mt-[8px] ml-[10px]">
                {emailServerMessage}
              </p>
            )} */}
          </div>

          <div className="w-full flex shrink-0">
            <div className="w-full mr-[10px]">
              <UserDataInput
                id="verificationCode"
                type="text"
                placeholder="6자리 인증번호를 입력하세요"
                requiredMessage="인증번호는 필수 입력 항목입니다"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <button
                type="button"
                className={`p-[15px] text-[12px] font-[500] whitespace-nowrap rounded-full 
                  ${isVerificationCodeFormatValid && isEmailAvailable ? 'bg-alert text-white' : 'bg-gray_light text-gray_text cursor-not-allowed'}`}
                onClick={handleCheckVerificationCodeClick}
                disabled={!isVerificationCodeFormatValid && !isEmailAvailable}
              >
                확인
              </button>
            </div>
          </div>

          <UserDataInput
            useFormMode="onChange"
            id="password"
            // label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            requiredMessage="비밀번호는 필수 입력 항목입니다"
            pattern={{
              value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/, // 숫자와 영문 소문자 6~10자
              message:
                '숫자와 영문 소문자로 이루어진 6-12자 비밀번호를 생성해주세요',
            }}
            position="left"
            register={register}
            errors={errors}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />

          <UserDataInput
            useFormMode="onChange"
            id="passwordConfirm"
            // label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            requiredMessage="비밀번호는 필수 입력 항목입니다"
            validate={(value: string) =>
              value === getValues('password') || '비밀번호가 일치하지 않습니다.'
            }
            // true, false를 리턴하며, 리턴 값이 문자열이면 에러 메시지를 리턴한다는 뜻
            position="left"
            register={register}
            errors={errors}
          />
        </form>
      </div>

      <div className="px-[24px] pt-[15px]">
        <AgreementCheckbox
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      <div className="mt-[200px] mx-[24px]">
        <button
          type="button" // form 안에 있는 button의 type이 submit이면 이거 클릭하면 form태그의 onSubmit이 실행됨(이 버튼은 Form태그 밖에 있어서 따로 onClick 설정함)
          className={`w-full py-[18px] flex items-center justify-center rounded-full mb-[70px] bg-primary text-white ${
            // bg-primary text-white
            isValid ? 'bg-primary text-white' : 'bg-gray_light text-gray_text'
          }`}
          onClick={() => handleSubmit(onSubmit)()}
        >
          다음
        </button>
      </div>

      {isModalOpen && (
        <OnboardingModal
          onClose={() => setIsModalOpen(false)}
          contents={modalContents}
        />
      )}
    </div>
  );
};

export default SignIn;
