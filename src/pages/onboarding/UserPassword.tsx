import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UserDataInput from '../../components/input/userDataInput/UserDataInput';
import Button from '../../components/button/Button';

interface UserPasswordProps {
  onNext: () => void; // 다음 단계로 이동하는 함수
}

const UserPassword: React.FC<UserPasswordProps> = ({ onNext }) => {
  const {
    handleSubmit, // 폼 제출 메서드
    watch, // 입력 필드 값 확인
    getValues,
    register,
    formState: { isValid, errors }, // 폼 상태 값
  } = useForm({ mode: 'onChange' }); // mode: onChange로 설정

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // userPassword 필드값 실시간 추적(콘솔 확인용)
  const passwordValue = watch('userPassword'); // userPassword 값 추적
  const passwordConfirmValue = watch('userPasswordConfirm'); // userPasswordConfirm 값 추적
  useEffect(() => {
    console.log('비밀번호:', passwordValue);
    console.log('비밀번호 확인:', passwordConfirmValue);
  }, [passwordValue, passwordConfirmValue]);

  const onSubmit = () => {
    onNext(); // 부모 컴포넌트에서 전달된 onNext 호출
  };

  return (
    <div className="flex flex-col m-5">
      <div className="flex flex-col space-y-4">
        <UserDataInput
          useFormMode="onChange"
          id="userPassword"
          label="비밀번호"
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
          id="userPasswordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          requiredMessage="비밀번호는 필수 입력 항목입니다"
          validate={(value: string) =>
            value === getValues('userPassword') ||
            '비밀번호가 일치하지 않습니다.'
          }
          // true, false를 리턴하며, 리턴 값이 문자열이면 에러 메시지를 리턴한다는 뜻
          position="left"
          register={register}
          errors={errors}
        />

        {/* Button 컴포넌트로 대체 */}
        <Button
          content="다음"
          bgColor="bg-primary"
          size="xl"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default UserPassword;
