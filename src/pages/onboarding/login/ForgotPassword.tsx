import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import UserDataInput from '../../../components/input/userDataInput/UserDataInput';
import OnboardingModal from '../../../components/modal/Modal';
import Header from '../../../components/header/Header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkEmailAvailability,
  checkVerificationCode,
  sendVerificationCode,
} from '../../../api/onboarding/SignIn';
import { resetPassword } from '../../../api/onboarding/Password';

const Callout = () => (
  <div className="border flex flex-col justify-center gap-[7px] py-[10px] px-[20px] border-gray_light rounded-[20px]">
    <p className="text-[12px] font-[600]">이메일 정보로 재설정</p>
    <p className="text-[12px] text-gray_text">
      가입한 스윗밸런스 계정의 이메일 정보로 비밀번호를 재설정할 수 있어요
    </p>
  </div>
);

interface PasswordFormData {
  email: string;
  verificationCode: string;
}

const EmailVerification: React.FC<{
  setEmail: (email: string) => void;
}> = ({ setEmail }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>({ mode: 'onChange' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(false);

  const emailValue = watch('email');
  const verificationCodeValue = watch('verificationCode');

  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const isVerificationCodeFormatValid = /^.{6}$/.test(verificationCodeValue);

  const queryClient = useQueryClient();

  const sendVeriCodeMutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['sendVerificationCode'] }),
    onError: (error) =>
      console.log('sendVerificationCode request onError: ', error),
  });

  const emailMutation = useMutation({
    mutationFn: checkEmailAvailability,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checkEmailAvailability'] });

      if (data.code === 0) {
        setModalContents('아이디를 찾을 수 없습니다');
        setIsModalOpen(true);
        setIsEmailAvailable(false);
      } else {
        setModalContents('인증번호가 입력하신 이메일로 전송되었습니다');
        setIsModalOpen(true);
        setIsEmailAvailable(true);
        sendVeriCodeMutation.mutate(emailValue);
        setEmail(emailValue); // ✅ 이메일 상태 저장
      }
    },
    onError: (error) =>
      console.log('checkEmailAvailability request onError: ', error),
  });

  const checkVeriCodeMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      checkVerificationCode(email, code),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checkVeriCodeMutation'] });
      setModalContents(
        data.code === 200 ? '인증에 성공했습니다' : '인증에 성공했습니다',
      );
      setIsModalOpen(true);
    },
    onError: () => {
      setModalContents('일치하지 않는 인증코드입니다');
      setIsModalOpen(true);
    },
  });

  return (
    <div className="w-full flex flex-col items-center mt-[30px]">
      <div className="w-full flex flex-col items-stretch min-w-0">
        {/* 이메일 입력 */}
        <div className="flex w-full mb-[20px] items-center">
          <div className="text-[12px] w-[85px] whitespace-nowrap shrink-0">
            아이디 (이메일)
          </div>
          <div className="flex flex-col w-full">
            <div className="w-full flex gap-[10px]">
              <div className="w-full">
                <UserDataInput
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  requiredMessage="이메일은 필수 입력 항목입니다"
                  register={register}
                  errors={errors}
                />
              </div>
              <button
                className={`p-[15px] text-[12px] shrink-0 font-[500] rounded-full ${
                  isEmailFormatValid
                    ? 'bg-alert text-white'
                    : 'bg-gray_light text-gray_text cursor-not-allowed'
                }`}
                onClick={() => emailMutation.mutate(emailValue)}
                disabled={!isEmailFormatValid}
              >
                인증하기
              </button>
            </div>
          </div>
        </div>

        {/* 인증번호 입력 (이메일 입력과 같은 스타일) */}
        <div className="flex w-full mb-[20px] items-center">
          <div className="text-[12px] w-[85px] whitespace-nowrap shrink-0">
            인증번호
          </div>
          <div className="flex flex-col w-full">
            <div className="w-full flex gap-[10px]">
              <div className="w-full">
                <UserDataInput
                  id="verificationCode"
                  type="text"
                  placeholder="6자리 인증번호를 입력하세요"
                  requiredMessage="인증번호는 필수 입력 항목입니다"
                  register={register}
                  errors={errors}
                />
              </div>
              <button
                className={`p-[15px] text-[12px] shrink-0 font-[500] rounded-full ${
                  isVerificationCodeFormatValid && isEmailAvailable
                    ? 'bg-alert text-white'
                    : 'bg-gray_light text-gray_text cursor-not-allowed'
                }`}
                onClick={() =>
                  checkVeriCodeMutation.mutate({
                    email: emailValue,
                    code: verificationCodeValue,
                  })
                }
                disabled={!isVerificationCodeFormatValid || !isEmailAvailable}
              >
                확인
              </button>
            </div>
          </div>
        </div>
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

const UserPassword: React.FC<{ email: string }> = ({ email }) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ userPassword: string; userPasswordConfirm: string }>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const passwordValue = watch('userPassword');

  const queryClient = useQueryClient();
  const passwordMutation = useMutation({
    mutationFn: ({
      email,
      newPassword,
    }: {
      email: string;
      newPassword: string;
    }) => resetPassword(email, newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resetPassword'] });
      navigate('/login');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <div className="text-[12px] w-[85px] shrink-0">새 비밀번호</div>
        <div className="w-full">
          <UserDataInput
            id="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            requiredMessage="비밀번호는 필수 입력 항목입니다"
            pattern={{
              value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/,
              message:
                '숫자와 영문 소문자로 이루어진 6-12자 비밀번호를 생성해주세요',
            }}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="mt-[20px] flex justify-between items-center">
        <div className="text-[12px] w-[85px] shrink-0">비밀번호 재확인</div>
        <div className="w-full">
          <UserDataInput
            id="userPasswordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            requiredMessage="비밀번호는 필수 입력 항목입니다"
            validate={(value) =>
              value === getValues('userPassword') ||
              '비밀번호가 일치하지 않습니다.'
            }
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="mt-[350px] mb-[40px]">
        <Button
          size="xl"
          bgColor="bg-primary"
          content="로그인하러 가기"
          onClick={() =>
            passwordMutation.mutate({ email, newPassword: passwordValue })
          }
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <div className="mt-[20px] w-full items-center px-[24px]">
      <Header headerTitle="비밀번호 재설정" />
      <Callout />
      <EmailVerification setEmail={setEmail} />
      <UserPassword email={email} />
    </div>
  );
};

export default ForgotPassword;
