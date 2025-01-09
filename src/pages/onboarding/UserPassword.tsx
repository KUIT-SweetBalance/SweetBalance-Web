import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UserDataInput from '../../components/input/userDataInput/UserDataInput';

const UserPassword = () => {
  const {
    handleSubmit, // 폼 제출 메서드
    watch, // 입력 필드 값 확인
    getValues,
    register,
    formState: { isValid, errors }, // 폼 상태 값
  } = useForm({ mode: 'onChange' }); // mode: onChange로 설정

  // userPassword 필드값 실시간 추적(콘솔 확인용)
  const passwordValue = watch('userPassword'); // userPassword 값 추적
  const passwordConfirmValue = watch('userPasswordConfirm'); // userPasswordConfirm 값 추적
  useEffect(() => {
    console.log('비밀번호:', passwordValue);
    console.log('비밀번호 확인:', passwordConfirmValue);
  }, [passwordValue, passwordConfirmValue]);

  return (
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
      />
      <UserDataInput
        useFormMode="onChange"
        id="userPasswordConfirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        requiredMessage="비밀번호는 필수 입력 항목입니다"
        validate={(value: string) =>
          value === getValues('userPassword') || '비밀번호가 일치하지 않습니다.'
        }
        // true, false를 리턴하며, 리턴 값이 문자열이면 에러 메시지를 리턴한다는 뜻
        position="left"
        register={register}
        errors={errors}
      />
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-full"
        disabled={!isValid}
      >
        제출
      </button>
    </div>
  );
};

export default UserPassword;
